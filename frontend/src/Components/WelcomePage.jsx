import catsSegmented from "../assets/segmented-and-original/catsSegmented.png";
import dogsSegmented from "../assets/segmented-and-original/dogsSegmented.png";
import bicycleSegmented from "../assets/segmented-and-original/bicycleSegmented.png";
import catImage from "../assets/segmented-and-original/cats.jpg";
import dogImage from "../assets/segmented-and-original/dogs.jpg";
import bicycleImage from "../assets/segmented-and-original/bicycle.jpg";
import abyss from "../assets/colorized-and-original/abyss.jpg";
import abyssColorized from "../assets/colorized-and-original/abyssColorized.png";
import Ali from "../assets/colorized-and-original/Ali.png";
import AliColorized from "../assets/colorized-and-original/AliColorized.png";
import city from "../assets/colorized-and-original/city.jpg";
import cityColorized from "../assets/colorized-and-original/cityColorized.png";
import firstCelebrity from "../assets/fake-celebrity/firstCelebrity.jpg";
import secondCelebrity from "../assets/fake-celebrity/secondCelebrity.jpg";
import thirdCelebrity from "../assets/fake-celebrity/thirdCelebrity.jpg";

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store";
import { Fade } from "react-awesome-reveal";
import WelcomePageInfo from "./WelcomePageInfo";
import data from "../data-for-info.js";
import SinglePhotoWelcome from "./SinglePhotoWelcome.jsx";
export default function WelcomePage() {
  const dispatch = useDispatch();
  const isLight = useSelector((state) => state.ui.isLight);
  function handleClick(type) {
    if (type === "goToHome") {
      dispatch(uiActions.changeUi("WelcomePage"));
    } else if (type === "goToSegmentation") {
      dispatch(uiActions.changeUi("SegmentationPage"));
    } else if (type === "goToColorization") {
      dispatch(uiActions.changeUi("ColorizationPage"));
    }
  }

  return (
    <div className={isLight ? "lightWelcome" : "darkWelcome"}>
      <Fade>
        <p className="title">
          Welcome to Different Types of Using of AI Project
        </p>
      </Fade>
      <WelcomePageInfo
        firstImage={catImage}
        secondImage={dogImage}
        thirdImage={bicycleImage}
        modifiedFirstImage={catsSegmented}
        modifiedSecondImage={dogsSegmented}
        modifiedThirdImage={bicycleSegmented}
        handleClick={handleClick}
        title={data.segmentation.title}
        description={data.segmentation.description}
        buttonText={data.segmentation.textForButton}
      />
      <WelcomePageInfo
        firstImage={abyss}
        secondImage={Ali}
        thirdImage={city}
        modifiedFirstImage={abyssColorized}
        modifiedSecondImage={AliColorized}
        modifiedThirdImage={cityColorized}
        handleClick={handleClick}
        title={data.colorization.title}
        description={data.colorization.description}
        buttonText={data.colorization.textForButton}
      />
      <SinglePhotoWelcome
        firstImage={firstCelebrity}
        secondImage={secondCelebrity}
        thirdImage={thirdCelebrity}
        handleClick={handleClick}
        title={data.fakecelebrity.title}
        description={data.fakecelebrity.description}
        buttonText={data.fakecelebrity.textForButton}
      />
    </div>
  );
}
