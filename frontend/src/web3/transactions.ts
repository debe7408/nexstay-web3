import { ethers, ContractTransaction, ContractReceipt } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import PropertyPaymentABI from "./abi/PropertyPaymentABI.json";
import ERC20ABI from "./abi/ERC20ABI.json";

const contractAddress = process.env
  .REACT_APP_PAYMENT_CONTRACT_ADDRESS as string;

const tokenAddress = process.env.REACT_APP_USDT_TOKEN_ADDRESS as string;

interface TransactionResponse {
  txReceipt: ContractReceipt | undefined;
  error?: string;
}

export const paymentTransaction = async (
  provider: Web3Provider,
  amount: string | number,
  receiver: string
): Promise<TransactionResponse> => {
  try {
    const signer = provider.getSigner();

    const weiAmount = ethers.utils.parseUnits(amount.toString(), "ether");

    const contract = new ethers.Contract(
      contractAddress,
      PropertyPaymentABI,
      signer
    );

    const txResponse: ContractTransaction = await contract.pay(
      weiAmount,
      receiver
    );

    const txReceipt = await txResponse.wait();

    return { txReceipt };
  } catch (error) {
    return {
      txReceipt: undefined,
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
    const signerAddress = await signer.getAddress();

    const weiAmount = ethers.utils.parseUnits(amount.toString(), "ether");

    const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, signer);

    const txResponse: ContractTransaction = await tokenContract.approve(
      contractAddress,
      weiAmount
    );
    const txReceipt = await txResponse.wait();

    return { txReceipt };
  } catch (error) {
    return {
      txReceipt: undefined,
      error:
        "Approval failed. Either you rejected the transaction or you don't have enough balance",
    };
  }
};
