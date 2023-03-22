import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    initAxiosClient();
  }, []);

  return (
    <>
      <Navbar></Navbar>
    </>
  );
}
