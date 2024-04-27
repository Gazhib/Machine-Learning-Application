import cv2
import io
import torchvision
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import transforms, models
import torchvision.models.segmentation as segmentation
from torchvision.transforms.functional import InterpolationMode
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
from modelscope.outputs import OutputKeys
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Check if GPU is available for PyTorch models
use_gpu = True if torch.cuda.is_available() else False

# Load the PGAN model for generating celebrity faces
model_pgan = torch.hub.load('facebookresearch/pytorch_GAN_zoo:hub',
                            'PGAN', model_name='celebAHQ-512',
                            pretrained=True, useGPU=use_gpu)

# Load the DeepLabV3 segmentation model
model_deeplab = segmentation.deeplabv3_resnet101(pretrained=True)
model_deeplab.eval()

# Initialize image colorization pipeline
img_colorization = pipeline(Tasks.image_colorization, model='damo/cv_ddcolor_image-colorization')

def apply_preprocessing(image):
    resize_size = [520]
    mean = [0.485, 0.456, 0.406]
    std = [0.229, 0.224, 0.225]
    transform = transforms.Compose([
        transforms.Resize(resize_size, interpolation=InterpolationMode.BILINEAR),
        transforms.ToTensor(),
        transforms.Normalize(mean=mean, std=std)
    ])
    return transform(image).unsqueeze(0)

def generate_colormap(num_classes):
    colormap = plt.get_cmap('tab20', num_classes)
    colors = [colormap(i)[:3] for i in range(num_classes)]
    return colors

class_colors = generate_colormap(21)

@app.route('/segment', methods=['POST'])
def segment_image():
    if 'file' not in request.files:
        return jsonify(error='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error='No selected file'), 400
    if file:
        image = Image.open(io.BytesIO(file.read()))
        input_image = apply_preprocessing(image)
        
        with torch.no_grad():
            output = model_deeplab(input_image)['out']
        
        prob_map = torch.softmax(output, dim=1)[0]
        pred_label = torch.argmax(prob_map, dim=0)

        colored_label = np.zeros((pred_label.shape[0], pred_label.shape[1], 3), dtype=np.uint8)
        for i in range(len(class_colors)):
            colored_label[pred_label == i] = [int(c * 255) for c in class_colors[i]]

        result_image = Image.fromarray(colored_label)
        time = datetime.now().strftime("%m%d%H%M%S%Y")
        result_image.save(os.path.join('static', f"segmented_image_{time}.png"))

        return jsonify(result=f"segmented_image_{time}.png")

@app.route('/colorize', methods=['POST'])
def colorize_image():
    if 'file' not in request.files:
        return jsonify(error='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(error='No selected file'), 400
    if file:
        image_path = secure_filename(file.filename)
        file.save(image_path)
        
        result = img_colorization(image_path)
        colorized_image = result[OutputKeys.OUTPUT_IMG]
        time = datetime.now().strftime("%m%d%H%M%S%Y")
        output_path = os.path.join('static', f"colorized_image_{time}.png")
        cv2.imwrite(output_path, colorized_image)

        return jsonify(result=output_path)

@app.route('/generate_face', methods=['GET'])
def generate_face():
    num_images = 1
    noise, _ = model_pgan.buildNoiseData(num_images)
    with torch.no_grad():
        generated_images = model_pgan.test(noise)

    grid = torchvision.utils.make_grid(generated_images.clamp(min=-1, max=1), scale_each=True, normalize=True)
    plt.imshow(grid.permute(1, 2, 0).cpu().numpy())
    plt.axis('off')
    time = datetime.now().strftime("%m%d%H%M%S%Y")
    image_path = os.path.join('static', f"generated_face_{time}.png")
    plt.savefig(image_path, bbox_inches='tight', pad_inches=0)
    plt.close()

    return jsonify(result=f"generated_face_{time}.png")

if __name__ == '__main__':
    app.run(debug=True)
