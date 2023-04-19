import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import { initWeb3Auth } from "./web3/web3auth";
import { useEffect } from "react";
import Routes from "./components/RouteComponent";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuthToken } from "./app/loginSlice";
import { setWeb3AuthState } from "./app/web3Slice";

export default function App() {
  const dispatch = useAppDispatch();
  const authorizationToken = useAppSelector(selectAuthToken);

  useEffect(() => {
    const init = async () => {
      const web3auth = await initWeb3Auth();
      dispatch(setWeb3AuthState(web3auth));
    };

    initAxiosClient(authorizationToken);

    !authorizationToken && init();
  }, [authorizationToken]);

  return (
    <>
      <Navbar></Navbar>
      <Routes></Routes>
    </>
  );
}
