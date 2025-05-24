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
  NotFoundPage,
} from "../component/pages";
import { RegistrationTeacher } from "../component/pages/registrationTeacher";
import { LettersIdentifyPage } from "../component/pages/lettersIdentifyPage";
import { EnglishLettersIdentifyPage } from "../component/pages/englishLettersIdentifyPage";
import { SinhalaLettersIdentifyPage } from "../component/pages/sinhalaLettersIdentifyPage";
import { RegistrationStudent } from "../component/pages/registrationStudent";
import ProtectedRoute from "../component/HighOrderComponent/ProtectedRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" Component={LoginPage} />
        <Route path="/registration-teacher" Component={RegistrationTeacher} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registration-student"
          element={
            <ProtectedRoute>
              <RegistrationStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher-dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/object-identifier"
          element={
            <ProtectedRoute>
              <ObjectIdentifierPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/numbers-Page"
          element={
            <ProtectedRoute>
              <NumbersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/numbers-Activity-Page"
          element={
            <ProtectedRoute>
              <NumbersActivityPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/numbers-Identify-Page"
          element={
            <ProtectedRoute>
              <NumbersIdentifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/drawing"
          element={
            <ProtectedRoute>
              <DrawingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-letters"
          element={
            <ProtectedRoute>
              <LettersIdentifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/english-signing"
          element={
            <ProtectedRoute>
              <EnglishLettersIdentifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sinhala-signing"
          element={
            <ProtectedRoute>
              <SinhalaLettersIdentifyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/letter-identify-activities"
          element={
            <ProtectedRoute>
              <ActivityLetterIdentifyPage />
            </ProtectedRoute>
          }
        />
        <Route
            path="*"
            element={<NotFoundPage />}
          />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
