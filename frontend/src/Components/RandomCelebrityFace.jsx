import { useSelector } from "react-redux";
import { FetchingRandomization } from "../fetching";
import { useState } from "react";
export default function RandomCelebrityFace() {
  const isLight = useSelector((state) => state.ui.isLight);
  const [image, setImage] = useState(null);
  async function handleClick() {
    const picture = await FetchingRandomization();
    setImage(`http://127.0.0.1:5000/static/${picture}`);
  }
  function handleReset(){
    setImage(null)
  }
  return (
    <div className="RandomCelebrityFacePage">
      <p className="instruction">
        In order to Create a Random Celebrity Face, press the button below. Wait
        for about 5 seconds and receive a photo in .jpg format
      </p>
      <button
        className={isLight ? "whiteSelectButton" : "blackSelectButton"}
        onClick={handleClick}
      >
        Generate
      </button>
      <img src={image} />
      {image && (
        <button
          className={isLight ? "whiteSelectButton" : "blackSelectButton"}
          onClick={handleReset}
        >
          Reset Button
        </button>
      )}
    </div>
  );
}
