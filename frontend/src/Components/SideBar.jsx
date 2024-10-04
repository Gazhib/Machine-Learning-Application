import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store";
import menu from "../icons/menu-navigation.png";
import lightIcon from "../icons/light-mode-icon.png";
import darkIcon from "../icons/dark-mode-icon.png";
import { Link } from "react-router-dom";
export default function SideBar() {
  const isLight = useSelector((state) => state.ui.isLight);
  const isShown = useSelector((state) => state.ui.sideBar);
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(uiActions.sideBar());
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
              <Link to={"/"}>Home</Link>
            </p>
            <p>
              <Link to={"/segmentation"}>
                {isShown ? "Segmentation of Image" : "Segment"}
              </Link>
            </p>
            <p>
              <Link to={"/colorization"}>
                {isShown ? "Colorization of an Image" : "Colorize"}
              </Link>
            </p>
            <p>
              <Link to={"/random-celebrity"}>
                {isShown ? "Random Celebrity Image" : "Celebrity"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
