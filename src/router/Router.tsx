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
import { RegistrationTeacher } from "../component/pages/registrationTeacher";
import { LettersIdentifyPage } from "../component/pages/lettersIdentifyPage";
import { EnglishLettersIdentifyPage } from "../component/pages/englishLettersIdentifyPage";
import { SinhalaLettersIdentifyPage } from "../component/pages/sinhalaLettersIdentifyPage";
import { RegistrationStudent } from "../component/pages/registrationStudent";


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route
          path="/registration-teacher"
          Component={RegistrationTeacher}
        />

        <Route
          path="/registration-student"
          Component={RegistrationStudent}
        />

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
        
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
