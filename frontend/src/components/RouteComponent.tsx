import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import SigninPage from "../pages/SignInPage";

const Main = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default Main;
