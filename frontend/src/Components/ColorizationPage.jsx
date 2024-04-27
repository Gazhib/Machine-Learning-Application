import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import { FetchingColorization } from "../fetching";
import ContainerImages from "./ContainerImages";
export default function ColorizationPage() {
  const isLight = useSelector((state) => state.ui.isLight);
  const button = useRef();
  const [image, setImage] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  function handleClick() {
    button.current.click();
  }
  function handleColorize(event) {
    if (event.target.files && event.target.files[0]) {
      const picture = event.target.files[0];
      setImage(URL.createObjectURL(picture));
      setColorizedImage(null)
      handleColorizeImage(picture);
    }
  }

  async function handleColorizeImage(picture) {
    const data = await FetchingColorization(picture);
    setColorizedImage(
      `http://127.0.0.1:5000/${data}`
    );
  }
  return (
    <div className={"ColorizationPage"}>
      <p className="instruction">
        In Order to Colorize the Image, you should press the button called
        Colorize Image.
        <br />
        Then you should wait for an approximately 10-15 seconds
      </p>
      <button
        className={isLight ? "whiteSelectButton" : "blackSelectButton"}
        onClick={handleClick}
      >
        Colorize the Image
      </button>
      <input onChange={handleColorize} ref={button} type="file" />
      <ContainerImages image = {image} secondImage={colorizedImage} typeOfImage='Colorized' />
    </div>
  );
}
