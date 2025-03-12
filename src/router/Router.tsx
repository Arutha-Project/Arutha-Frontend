import { BrowserRouter, Route, Routes } from "react-router-dom";
import { 
  LoginPage,
  HomePage,
  DrawingPage
 } from "../component/pages";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} Component={LoginPage} />
        <Route path={"/home"} Component={HomePage} />
        <Route path={"/drawing"} Component={DrawingPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
