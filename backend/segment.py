import streamlit as st
import torch
from PIL import Image
from torchvision import transforms
import torchvision.models.segmentation as segmentation
import matplotlib
import matplotlib.pyplot as plt
from torchvision.transforms.functional import InterpolationMode
import numpy as np

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

# Load the model
model = segmentation.deeplabv3_resnet101(pretrained=True)

# Define the color map
class_colors = generate_colormap(21)

def main():
    st.title("Image Segmentation")

    uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        input_image = apply_preprocessing(image)
        
        model.eval()
        with torch.no_grad():
            output = model(input_image)['out']
        
        
        # Convert output to probability map
        prob_map = torch.softmax(output, dim=1)[0]
        pred_label = torch.argmax(prob_map, dim=0)

        colored_label = np.zeros((pred_label.shape[0], pred_label.shape[1], 3), dtype=np.uint8)
        for i in range(len(class_colors)):
            colored_label[pred_label == i] = [int(c * 255) for c in class_colors[i]]

        st.image(colored_label, caption='Segmentation Result')

if __name__ == '__main__':
    main()
