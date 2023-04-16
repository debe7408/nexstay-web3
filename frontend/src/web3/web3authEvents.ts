import { ADAPTER_EVENTS, CONNECTED_EVENT_DATA } from "@web3auth/base";
import { LOGIN_MODAL_EVENTS } from "@web3auth/ui";
import { Web3Auth } from "@web3auth/modal";
import { Web3Provider } from "@ethersproject/providers";
import { setWeb3Params, reset } from "../app/web3Slice";
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
      }
    } catch (error) {
      console.log(error);
      throw Error(error as string);
    }
  });

  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    dispatch(reset());
    window.location.reload();
  });

  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {});
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {});
  web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {});
};

export default subscribeAuthEvents;
