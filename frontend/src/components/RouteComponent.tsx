import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { RegisterPage } from "../pages/RegisterPage";
import { SignIn } from "../pages/SignInPage";
const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};
export default Main;
