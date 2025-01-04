import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  LoginPage,
  HomePage

 } from "../component/pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path={"/home"} Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
