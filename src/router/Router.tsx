import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  LoginPage,
  HomePage,
  objectIdentifierPage
 } from "../component/pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path={"/home"} Component={HomePage} />
        <Route path={"/objectIdentifierPage"} Component={objectIdentifierPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
