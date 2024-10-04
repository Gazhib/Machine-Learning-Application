import SegmentationPage from "./Components/SegmentationPage";
import ColorizationPage from "./Components/ColorizationPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import WelcomePage from "./Components/WelcomePage";
import { useState } from "react";
import RandomCelebrityFace from "./Components/RandomCelebrityFace";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <WelcomePage />,
        },
        {
          path: "/segmentation",
          element: <SegmentationPage />,
        },
        {
          path: "/colorization",
          element: <ColorizationPage />,
        },
        {
          path: "/random-celebrity",
          element: <RandomCelebrityFace />,
        },
      ],
    },
  ]);

  const isLight = useSelector((state) => state.ui.isLight);
  const [isFirstMount, setIsFirstMount] = useState(true);

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
  return <RouterProvider router={router} />;
}

export default App;
