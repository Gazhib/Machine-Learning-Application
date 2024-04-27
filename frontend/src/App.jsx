import SegmentationPage from "./Components/SegmentationPage";
import SideBar from "./Components/SideBar";
import ColorizationPage from "./Components/ColorizationPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WelcomePage from "./Components/WelcomePage";
import { useState } from "react";
import RandomCelebrityFace from "./Components/RandomCelebrityFace";
function App() {
  const show = useSelector((state) => state.ui.show);
  const isLight = useSelector((state) => state.ui.isLight);
  const [isFirstMount, setIsFirstMount] = useState(true);
  let text;
  if (show === "WelcomePage") {
    text = <WelcomePage />;
  } else if (show === "SegmentationPage") {
    text = <SegmentationPage />;
  } else if (show === "ColorizationPage") {
    text = <ColorizationPage />;
  } else if (show === "RandomizationPage"){
    text = <RandomCelebrityFace />
  }
  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
    } else {
      document.body.style.transitionProperty = "background-color";
      document.body.style.transitionDuration = "0.5s";
    }

    if (isLight) {
      document.body.style.backgroundColor = "#ECEFF1";
      document.body.style.color = "rgb(33, 33, 33)";
    } else {
      document.body.style.color = "#ECEFF1";
      document.body.style.backgroundColor = "rgb(33, 33, 33)";
    }
  }, [isLight, isFirstMount]);
  return (
    <div className="App">
      <SideBar />
      {text}
    </div>
  );
}

export default App;
