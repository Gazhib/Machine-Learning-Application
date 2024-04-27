import { useSelector } from "react-redux";
import { FetchingSegmentation } from "../fetching";
import { useRef, useState } from "react";
import ContainerImages from "./ContainerImages";
export default function SegmentationPage() {
  const [image, setImage] = useState(null);
  const [segmentedImage, setSegmentedImage] = useState(null);
  const button = useRef(null);
  const isLight = useSelector((state) => state.ui.isLight);
  function handleClick() {
    if (button.current) {
      button.current.click();
    }
  }

  function handleImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      const picture = event.target.files[0];
      setImage(URL.createObjectURL(picture));
      setSegmentedImage(null)
      handleImageUpload(picture);
    }
  }

  async function handleImageUpload(picture) {
    const data = await FetchingSegmentation(picture);
    setSegmentedImage(`http://127.0.0.1:5000/static/${data}`);
  }

  return (
    <div className="SegmentationPage">
      <p className="instruction">
        In order to Segment the image, press the button (Segment the Image) and
        choose a picture. <br />
        Wait for a 10-15 seconds and receive your segmented photo in .png format
      </p>
      <input ref={button} type="file" onChange={handleImageChange} />
      <button
        className={isLight ? "whiteSelectButton" : "blackSelectButton"}
        onClick={handleClick}
      >
        Segment the Image
      </button>
        <ContainerImages key={image} image={image} secondImage={segmentedImage} typeOfImage='Segmented'/>
    </div>
  );
}
