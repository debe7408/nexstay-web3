import { ADAPTER_EVENTS, CONNECTED_EVENT_DATA } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { Web3Provider } from "@ethersproject/providers";
import { setWeb3Params, reset } from "../app/web3Slice";
import { login, logout } from "../app/loginSlice";
import { store } from "../app/store";

const subscribeAuthEvents = (web3auth: Web3Auth) => {
  const { dispatch } = store;
  web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data: CONNECTED_EVENT_DATA) => {
    try {
      if (web3auth.provider) {
        const web3Provider = new Web3Provider(web3auth.provider);
        const currentNetwork = await web3Provider.getNetwork();
        const chainId = currentNetwork.chainId;
        const signerAddress = await web3Provider.getSigner().getAddress();

        dispatch(
          setWeb3Params({
            chainId,
            signerAddress,
            provider: web3Provider,
          })
        );

        dispatch(login(data.adapter));
      }
    } catch (error) {
      console.log(error);
      throw Error(error as string);
    }
  });

  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    dispatch(logout());
    dispatch(reset());
    window.location.reload();
  });

  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {});
};

export default subscribeAuthEvents;
