import { ethers, ContractTransaction, ContractReceipt } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import PropertyPaymentABI from "./abi/PropertyPaymentABI.json";
import ERC20ABI from "./abi/ERC20ABI.json";

const contractAddress = process.env
  .REACT_APP_PAYMENT_CONTRACT_ADDRESS as string;

const tokenAddress = process.env.REACT_APP_USDT_TOKEN_ADDRESS as string;

interface TransactionResponse {
  hash?: string;
  error?: string;
}

export const paymentTransaction = async (
  provider: Web3Provider,
  amount: string,
  receiver: string
): Promise<TransactionResponse> => {
  try {
    const signer = provider.getSigner();

    const weiAmount = ethers.utils.parseUnits(amount, "ether");

    const contract = new ethers.Contract(
      contractAddress,
      PropertyPaymentABI,
      signer
    );

    const txResponse: ContractTransaction = await contract.pay(
      weiAmount,
      receiver
    );

    await txResponse.wait();

    return { hash: txResponse.hash };
  } catch (error) {
    // For advanced users, display the full error reason in the console
    console.log(error);
    return {
      error:
        "Payment transaction failed. Either you rejected the transaction or the approved amount is not the same.",
    };
  }
};
// TODO IMPROVEMENT: Add a check to see if the user has already approved the contract to spend their tokens
export const approvalTransaction = async (
  provider: Web3Provider,
  amount: string | number
): Promise<TransactionResponse> => {
  try {
    const signer = provider.getSigner();

    const weiAmount = ethers.utils.parseUnits(amount.toString(), "ether");

    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

    const txResponse: ContractTransaction = await tokenContract.approve(
      contractAddress,
      weiAmount
    );
    await txResponse.wait();

    return { hash: txResponse.hash };
  } catch (error) {
    // For advanced users, display the full error reason in the console
    console.log(error);
    return {
      error:
        "Approval failed. Either you rejected the transaction or you don't have enough balance",
    };
  }
};
