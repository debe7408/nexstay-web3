import { ethers } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import PropertyPaymentABI from "./abi/PropertyPaymentABI.json";
import ERC20ABI from "./abi/ERC20ABI.json";

export const paymentTransaction = async (
  provider: Web3Provider,
  amount: string | number,
  receiver: string
) => {
  try {
    const signer = provider.getSigner();

    const contractAddress = process.env
      .REACT_APP_PAYMENT_CONTRACT_ADDRESS as string;
    const tokenAddress = process.env.REACT_APP_USDT_TOKEN_ADDRESS as string;

    const weiAmount = ethers.utils.parseUnits(amount.toString(), "ether");

    const contract = new ethers.Contract(
      contractAddress,
      PropertyPaymentABI,
      signer
    );

    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

    const approveTxResponse = await tokenContract.approve(
      tokenAddress,
      weiAmount
    );
    const approveTxReceipt = await approveTxResponse.wait();

    const txResponse = await contract.pay(weiAmount, receiver);
    const txReceipt = await txResponse.wait();

    return txReceipt;
  } catch (error) {
    console.log(error);
  }
};
