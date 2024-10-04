import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";

export default function RootLayout() {
  return (
    <div className="App">
      <SideBar />
      <Outlet />
    </div>
  );
}
