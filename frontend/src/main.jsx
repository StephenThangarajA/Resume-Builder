import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ResumeProvider } from "./contexts/ResumeContext.jsx";
import Write from "./pages/Write.jsx";
import ResumeContents from "./pages/ResumeContents.jsx";
import HowToDownload from "./components/HowToDownload.jsx";
import ATSCheck from "./pages/ATSCheck.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import PromptSelect from "./pages/PromptSelect.jsx";
import ResumeUploadPage from "./pages/ResumeUploadPage.jsx";
import TextInputPage from "./pages/TextInputPage.jsx";
import Guides from "./pages/Guides.jsx";
import Examples from "./pages/Examples.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ChooseTemplate from "./pages/ChooseTemplate.jsx";
import Resume1 from "./components/Resume1.jsx";
import Resume2 from "./components/Resume2.jsx";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <Write />,
  },
  {
    path: "/print",
    element: <ResumeContents />,
  },
  {
    path: "/how-to-download",
    element: <HowToDownload />,
  },
  {
    path: "/ats-check",
    element: <ATSCheck />,
  },
  {
    path: "/cover-letter/builder",
    element: <SplashPage />,
  },
  {
    path: "/your-skills",
    element: <PromptSelect />,
  },
  {
    path: "/resume-upload",
    element: <ResumeUploadPage />,
  },
  {
    path: "/text-input",
    element: <TextInputPage />,
  },
  {
    path: "/cover-letter/guides",
    element: <Guides />,
  },
  {
    path: "/cover-letter/examples",
    element: <Examples />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/choosetemplate",
    element: <ChooseTemplate />
  },
  {
    path: "/resume1",
    element: <Resume1 />
  },
  {
    path: "/resume2",
    element: <Resume2 />
  },
]);

createRoot(document.getElementById("root")).render(
      <ResumeProvider>
        <RouterProvider router={router} />
      </ResumeProvider>
);
