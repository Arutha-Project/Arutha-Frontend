import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  HomePage,
  NumbersPage,
  NumbersActivityPage,
  NumbersIdentifyPage,
  AboutUs,
  DrawingPage
} from "../component/pages";
import ObjectIdentifierPage from "../component/pages/objectIdentifierPage/objectIdentifierPage";
import { LettersIdentifyPage } from "../component/pages/lettersIdentifyPage";
import { EnglishLettersIdentifyPage } from "../component/pages/englishLettersIdentifyPage";
import { SinhalaLettersIdentifyPage } from "../component/pages/sinhalaLettersIdentifyPage";
import { ActivityLetterIdentifyPage } from "../component/pages/activityLetterIdentifyPage";


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
          path="/letter-identify-activities" 
          Component={ActivityLetterIdentifyPage} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
