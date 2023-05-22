import { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "../app/hooks";
import { selectAuthToken, selectUser } from "../app/loginSlice";
import SuspensePage from "../pages/SuspensePage";
import { UserType } from "../types/user";
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

const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));

const Main = () => {
  const location = useLocation();
  const loginState = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectUser);
  const [userType, setUserType] = useState<UserType>();

  useEffect(() => {
    if (loginState && user) {
      const { type } = user;
      setUserType(type);
    }
  }, [loginState]);

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
            <Route
              path="/admin/dashboard"
              element={
                loginState && userType === UserType.ADMIN ? (
                  <AdminDashboard />
                ) : (
                  <NotFound />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Main;
