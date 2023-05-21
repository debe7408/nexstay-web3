import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "../app/hooks";
import { selectAuthToken } from "../app/loginSlice";
import SuspensePage from "../pages/SuspensePage";
const Home = lazy(() => import("../pages/Home/Home"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const HostLanding = lazy(() => import("../pages/Host/HostLandingPage"));
const HostForm = lazy(() => import("../pages/Host/HostingForm"));
const UnauthorizedPage = lazy(() => import("../pages/UnauthorizedPage"));
const Accommodation = lazy(
  () => import("../pages/Accommodation/AccommodationPage")
);
const NotFound = lazy(() => import("../pages/InvalidPage"));
const ManageReservations = lazy(
  () => import("../pages/Profile/ManageReservations/ManageReservations")
);

const ManageTickets = lazy(
  () => import("../pages/Profile/ManageTickets/ManageTickets")
);

const ManagePayment = lazy(() => import("../pages/Checkout/ManagePayment"));

const Main = () => {
  const location = useLocation();
  const loginState = useAppSelector(selectAuthToken);

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Suspense fallback={<SuspensePage />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route
              path="/myProfile"
              element={loginState ? <Profile /> : <UnauthorizedPage />}
            />
            <Route
              path="/myProfile/manage-reservations"
              element={
                loginState ? <ManageReservations /> : <UnauthorizedPage />
              }
            />
            <Route
              path="/myProfile/manage-tickets"
              element={loginState ? <ManageTickets /> : <UnauthorizedPage />}
            />
            <Route
              path="/host/information"
              element={loginState ? <HostLanding /> : <UnauthorizedPage />}
            />
            <Route
              path="/host/start-hosting"
              element={loginState ? <HostForm /> : <UnauthorizedPage />}
            />
            <Route path="/accommodation/:id" element={<Accommodation />} />
            <Route
              path="/checkout/:id"
              element={loginState ? <ManagePayment /> : <UnauthorizedPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Main;
