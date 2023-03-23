import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import { useEffect } from "react";
import Routes from "./components/RouteComponent";

export default function App() {
  useEffect(() => {
    initAxiosClient();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Routes></Routes>
    </>
  );
}
