/* eslint-disable react/prop-types */
import { Fade } from "react-awesome-reveal";
export default function SinglePhotoWelcome({
  title,
  description,
  firstImage,
  secondImage,
  thirdImage,
  buttonText,
  handleClick,
}) {
  return (
    <>
      <Fade>
        <p className="title">{title}</p>
      </Fade>
      <Fade className="innerWelcome">
        <p>{description}</p>
        <p>Here you can see a couple of examples:</p>
      </Fade>
      <div className="soloImages">
        <Fade className="image">
          <img src={firstImage} />
        </Fade>
        <Fade className="image">
          <img src={secondImage} />
        </Fade>
        <Fade className="image">
          <img src={thirdImage} />
        </Fade>
      </div>
      <Fade className="button">
        <button onClick={() => handleClick("goToColorization")}>
          {buttonText}
        </button>
      </Fade>
    </>
  );
}
