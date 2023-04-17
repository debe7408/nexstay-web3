import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HomePage from "../pages/Home/Home";
import ProfilePage from "../pages/Profile/Profile";
import HostLandingPage from "../pages/Host/HostLandingPage";
import BecomeHostPage from "../pages/Host/BecomeHost";

const Main = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/host/information" element={<HostLandingPage />} />
          <Route path="/host/start-hosting" element={<BecomeHostPage />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};
export default Main;
