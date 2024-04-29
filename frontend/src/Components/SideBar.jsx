import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store";
import menu from "../icons/menu-navigation.png";
import lightIcon from "../icons/light-mode-icon.png";
import darkIcon from "../icons/dark-mode-icon.png";
export default function SideBar() {
  const isLight = useSelector((state) => state.ui.isLight);
  const isShown = useSelector((state) => state.ui.sideBar);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(uiActions.sideBar());
  }
  function handleChangeUi(type) {
    if (type === "goToHome") {
      dispatch(uiActions.changeUi("WelcomePage"));
    } else if (type === "goToSegmentation") {
      dispatch(uiActions.changeUi("SegmentationPage"));
    } else if (type === "goToColorization") {
      dispatch(uiActions.changeUi("ColorizationPage"));
    } else if (type === "goToRandomization") {
      dispatch(uiActions.changeUi("RandomizationPage"));
    }
  }
  function handleSwitchMode() {
    dispatch(uiActions.lightNight());
  }
  return (
    <aside>
      <div className={isLight ? "lightBar" : "darkBar"}>
        <div className={isShown ? "SideBar" : "HiddenSideBar"}>
          <div className="buttonIcons">
            <img onClick={handleClick} className="menuIcon" src={menu} />
            <img
              onClick={handleSwitchMode}
              className={isLight ? "whiteModeSwitcher" : "blackModeSwitcher"}
              src={isLight ? lightIcon : darkIcon}
            />
          </div>
          <div className={isShown ? "SideBarText" : "HiddenSideBarText"}>
            <p>
              <button onClick={() => handleChangeUi("goToHome")}>Home</button>
            </p>
            <p>
              <button onClick={() => handleChangeUi("goToSegmentation")}>
                <p>{isShown ? "Segmentation of Image" : "Segment"}</p>
              </button>
            </p>
            <p>
              <button onClick={() => handleChangeUi("goToColorization")}>
                {isShown ? "Colorization of an Image" : "Colorize"}
              </button>
            </p>
            <p>
              <button onClick={() => handleChangeUi("goToRandomization")}>
                {isShown ? "Random Celebrity Image" : "Celebrity"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
