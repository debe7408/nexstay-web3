import Navbar from "./components/Navbar";
import { initAxiosClient } from "./axios/axiosClient";
import {
  connectWeb3auth,
  disconnectWeb3auth,
  initWeb3Auth,
} from "./web3/web3auth";
import { useEffect } from "react";
import Routes from "./components/RouteComponent";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuthToken } from "./app/loginSlice";
import { setWeb3AuthState, web3authSelector } from "./app/web3Slice";
import { Button } from "@mui/material";

export default function App() {
  const dispatch = useAppDispatch();
  const authorizationToken = useAppSelector(selectAuthToken);
  const web3AuthInstance = useAppSelector(web3authSelector);

  useEffect(() => {
    const init = async () => {
      const web3auth = await initWeb3Auth();
      dispatch(setWeb3AuthState(web3auth));
    };

    initAxiosClient(authorizationToken);

    init();
  }, [authorizationToken]);

  return (
    <>
      <Navbar></Navbar>
      <Routes></Routes>
      <Button onClick={async () => await connectWeb3auth(web3AuthInstance)}>
        OPEN MODAL
      </Button>
      <Button onClick={() => disconnectWeb3auth(web3AuthInstance)}>
        LOGOUT
      </Button>
    </>
  );
}
