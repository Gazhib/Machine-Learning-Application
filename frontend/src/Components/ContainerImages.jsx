/* eslint-disable react/prop-types */
import loadingGif from "../icons/loading-button.gif";
export default function ContainerImages({ image, typeOfImage, secondImage }) {
  return (
    <div className={`originalAnd${typeOfImage}Images`}>
      {image && <img src={image} alt="Your Uploaded Image" />}
      {secondImage ? (
        <img src={secondImage} alt={`${typeOfImage} result`} />
      ) : (
        image && (
          <div className="loadingSide">
            <img className="loadingGif" src={loadingGif} />
            <img className="loadingImage" src={image} alt="Loading..."></img>
          </div>
        )
      )}
    </div>
  );
}
