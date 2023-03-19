import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import { SignIn } from "../pages/SignInPage";
const Main = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default Main;
