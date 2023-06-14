import { BigNumber, utils, Contract } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import ERC20ABI from "./abi/ERC20ABI.json";

const tokenAddress = process.env.REACT_APP_USDT_TOKEN_ADDRESS as string;
export const minimalVisibleValue = BigNumber.from(1e14);

/**
 * Returns the balance of the wallet in ETH as a BigNumber
 * @param provider - The provider to use for the connection
 */
export const getWalletBalance = async (provider: Web3Provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);

  return balance;
};

/**
 * Returns the balance of a token in the wallet as a BigNumber
 * @param provider - The provider to use for the connection
 */
export const getTokenBalance = async (provider: Web3Provider) => {
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const tokenContract = new Contract(tokenAddress, ERC20ABI, signer);

  const balance: BigNumber = await tokenContract.balanceOf(address);

  return balance;
};

/**
 * Returns formatted BigNumber for display
 * @param value - The BigNumber to format
 * @optional decimalPoints - The number of digits to display after the decimal point
 */
export const formatBigNumberForDisplay = (
  value: BigNumber,
  decimalPoints?: number
) => {
  if (!value.isZero() && value.lt(minimalVisibleValue)) {
    return "< 0.0001";
  }
  const strigifiedValue = utils.formatEther(value);
  return (+strigifiedValue).toFixed(decimalPoints || 4);
};
