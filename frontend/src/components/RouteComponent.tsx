import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HomePage from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";
import SigninPage from "../pages/SignInPage";
import ProfilePage from "../pages/Profile";

const Main = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default Main;
