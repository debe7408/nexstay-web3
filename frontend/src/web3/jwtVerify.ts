import { Web3Auth } from "@web3auth/modal";
import { getPublicCompressed } from "@toruslabs/eccrypto";

/**
 * TODO - Implement backend call to verify JWT token
 **/
export const jwtVerificationWallet = async (
  web3auth: Web3Auth,
  signerAddress: string,
  adapter: string
) => {
  const jwtToken = await web3auth.authenticateUser();

  return { jwtToken, signerAddress };

  // execute axios request to backend
  // authorization header = jwtToken
  // body = { signerAddress, adapter }
};

/**
 * TODO - Implement backend call to verify JWT token
 **/
export const jwtVerificationTokenSocial = async (
  web3auth: Web3Auth,
  adapter: string
) => {
  const appScopedPrivateKey = (await web3auth.provider?.request({
    method: "eth_private_key",
  })) as string;

  const appPublicKey = getPublicCompressed(
    Buffer.from(appScopedPrivateKey.padStart(64, "0"), "hex")
  ).toString("hex");

  const jwtToken = (await web3auth.authenticateUser()).idToken;

  return { jwtToken, appPublicKey };

  // execute axios request to backend
  // authorization header = idToken
  // body = { appPublicKey, adapter }
};
