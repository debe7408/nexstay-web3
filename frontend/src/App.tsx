import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import { useEffect } from "react";
import Routes from "./components/RouteComponent";
import { useAppSelector } from "./app/hooks";
import { selectAuthToken } from "./app/loginSlice";

export default function App() {
  const authorizationToken = useAppSelector(selectAuthToken);

  useEffect(() => {
    initAxiosClient(authorizationToken);
  }, [authorizationToken]);

  return (
    <>
      <Navbar></Navbar>
      <Routes></Routes>
    </>
  );
}
