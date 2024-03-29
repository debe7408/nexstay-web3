import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { Web3Provider } from "@ethersproject/providers";
import subscribeAuthEvents from "./web3authEvents";

export const initWeb3Auth = async () => {
  try {
    const web3auth = new Web3Auth({
      clientId: process.env.REACT_APP_WEB3AUTH_CLIENTID as string,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: process.env.REACT_APP_CHAIN_ID || "0x61",
        rpcTarget: process.env.REACT_APP_RPC_TARGET,
        blockExplorer: process.env.REACT_APP_BLOCK_EXPLORER,
      },
      uiConfig: {
        theme: "dark",
      },
      web3AuthNetwork: "testnet",
    });

    web3auth.clearCache();

    await web3auth.initModal();

    subscribeAuthEvents(web3auth);

    return web3auth;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const connectWeb3auth = async (web3auth: Web3Auth | null) => {
  if (!web3auth) return;
  const web3authProvider = await web3auth.connect();
  const web3Provider = new Web3Provider(web3authProvider!);
  const signerAddress = await web3Provider.getSigner().getAddress();

  return signerAddress;
};

export const disconnectWeb3auth = async (web3auth: Web3Auth | null) => {
  try {
    if (!web3auth) return;
    await web3auth.logout();
  } catch (error) {
    console.error(error);
  }
};
