import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  LoginPage,
  HomePage,
  NumbersPage,
  NumbersActivityPage,
  NumbersIdentifyPage,
  SideMenu 
 } from "../component/pages";
import { MainLayout } from "../component/templates";
import ObjectIdentifierPage from "../component/pages/objectIdentifierPage/objectIdentifierPage";
import { LettersIdentifyPage } from "../component/pages/lettersIdentifyPage";
import { EnglishLettersIdentifyPage } from "../component/pages/englishLettersIdentifyPage";
import { SinhalaLettersIdentifyPage } from "../component/pages/sinhalaLettersIdentifyPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route 
          path="/home" 
          element={<MainLayout><HomePage/></MainLayout>} 
        />

        <Route 
          path="/object-identifier" 
          element={<MainLayout><ObjectIdentifierPage/></MainLayout>} 
        />

        <Route 
          path="/numbers_Page" 
          element={<MainLayout><NumbersPage/></MainLayout>} 
        />

        <Route 
          path="/numbers-Activity-Page" 
          element={<MainLayout><NumbersActivityPage/></MainLayout>} 
        />

        <Route
          path="/numbers-Identify-Page"
          element={<MainLayout><NumbersIdentifyPage /></MainLayout>}
        />

         <Route 
          path="/sign-letters" 
          element={<MainLayout><LettersIdentifyPage/></MainLayout>} 
        />

         <Route 
          path="/english-signing" 
          element={<MainLayout><EnglishLettersIdentifyPage/></MainLayout>} 
        />

         <Route 
          path="/sinhala-signing" 
          element={<MainLayout><SinhalaLettersIdentifyPage/></MainLayout>} 
        />

        <Route path={"/sideMenu"} Component={SideMenu} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
