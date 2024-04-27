import { Fade } from "react-awesome-reveal";
export default function WelcomePageInfo({
  title,
  description,
  firstImage,
  secondImage,
  thirdImage,
  modifiedFirstImage,
  modifiedSecondImage,
  modifiedThirdImage,
  handleClick,
  buttonText
}) {
  return (
    <>
      <Fade>
        <p className="title">{title}</p>
      </Fade>
      <Fade className="innerWelcome">
        <p>
          {description}
        </p>
        <p>Here you can see a couple of Before and After examples:</p>
      </Fade>
      <div className="images">
        <Fade className="image">
          <img src={firstImage} />

          <img src={modifiedFirstImage} />
        </Fade>
        <Fade className="image">
          <img src={secondImage} />

          <img src={modifiedSecondImage} />
        </Fade>
        <Fade className="image">
          <img src={thirdImage} />

          <img src={modifiedThirdImage} />
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
