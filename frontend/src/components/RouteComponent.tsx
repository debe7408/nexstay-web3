import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HomePage from "../pages/Home/Home";
import ProfilePage from "../pages/Profile/Profile";
import HostLandingPage from "../pages/Host/HostLandingPage";
import HostForm from "../pages/Host/HostingForm";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import AccommodationPage from "../pages/Accommodation/AccommodationPage";
import NotFound from "../pages/InvalidPage";
import ReservationPage from "../pages/Reservation/ReservationPage";
import { useAppSelector } from "../app/hooks";
import { selectAuthToken } from "../app/loginSlice";

const Main = () => {
  const location = useLocation();
  const loginState = useAppSelector(selectAuthToken);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/myProfile"
            element={loginState ? <ProfilePage /> : <UnauthorizedPage />}
          />
          <Route
            path="/host/information"
            element={loginState ? <HostLandingPage /> : <UnauthorizedPage />}
          />
          <Route
            path="/host/start-hosting"
            element={loginState ? <HostForm /> : <UnauthorizedPage />}
          />
          <Route path="/accommodation/:id" element={<AccommodationPage />} />
          <Route
            path="/accommodation/reserve/:id"
            element={loginState ? <ReservationPage /> : <UnauthorizedPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Main;
