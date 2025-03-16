import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  NumbersPage,
  NumbersActivityPage,
  NumbersIdentifyPage,
  AboutUs,
  DrawingPage,
  ObjectIdentifierPage,
  ActivityLetterIdentifyPage
} from "../component/pages";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route
          path="/home"
          Component={HomePage}
        />

        <Route
          path="/about-us"
          Component={AboutUs}
        />

        <Route
          path="/object-identifier"
          Component={ObjectIdentifierPage}
        />

        <Route
          path="/numbers-Page"
          Component={NumbersPage}
        />

        <Route
          path="/numbers-Activity-Page"
          Component={NumbersActivityPage}
        />

        <Route
          path="/numbers-Identify-Page"
          Component={NumbersIdentifyPage}
        />
        <Route
          path={"/home"}
          Component={HomePage}
        />
        <Route
          path={"/drawing"}
          Component={DrawingPage}
        />
        <Route
          path="/sign-letters"
          Component={ActivityLetterIdentifyPage}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
