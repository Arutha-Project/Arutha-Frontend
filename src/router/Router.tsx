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
  ActivityLetterIdentifyPage,
  TeacherDashboardPage,
} from "../component/pages";
import { LettersIdentifyPage } from "../component/pages/lettersIdentifyPage";
import { EnglishLettersIdentifyPage } from "../component/pages/englishLettersIdentifyPage";
import { SinhalaLettersIdentifyPage } from "../component/pages/sinhalaLettersIdentifyPage";
import { forgotPasswordPage } from "../component/pages/forgotPasswordPage";
import { resetPasswordPage } from "../component/pages/resetPasswordPage";


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
          path="/teacher-dashboard"
          Component={TeacherDashboardPage}
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
          Component={LettersIdentifyPage}
        />
        <Route
          path="/english-signing"
          Component={EnglishLettersIdentifyPage}
        />

         <Route
          path="/sinhala-signing"
          Component={SinhalaLettersIdentifyPage}
        />

        <Route
          path="/letter-identify-activities"
          Component={ActivityLetterIdentifyPage}
        />

        <Route
          path="/forgotPassword"
          Component={forgotPasswordPage}
        />

        <Route
          path="/reset-password"
          Component={resetPasswordPage}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
