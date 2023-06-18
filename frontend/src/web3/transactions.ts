import { ethers, ContractTransaction } from "ethers";
import type { Web3Provider } from "@ethersproject/providers";
import PropertyPaymentABI from "./abi/PropertyPaymentABI.json";
import ERC20ABI from "./abi/ERC20ABI.json";
import {
  CreateFlow,
  TransactionInfo,
  ValidationError,
} from "@streamable-finance/sdk-redux";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { MutationDefinition, BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { CacheTagTypes } from "@streamable-finance/sdk-redux/dist/module/redux-slices/rtk-query/cacheTags/CacheTagTypes";
import { MutationMeta } from "@streamable-finance/sdk-redux/dist/module/redux-slices/rtk-query/returnTypes";

const contractAddress = process.env
  .REACT_APP_PAYMENT_CONTRACT_ADDRESS as string;

const tokenAddress = process.env.REACT_APP_USDT_TOKEN_ADDRESS as string;
const streammableTokenAddress = process.env
  .REACT_APP_STRUSDT_TOKEN_ADDRESS as string;
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

export const handleSendStream = async (
  provider: Web3Provider,
  amount: string,
  receiver: string,
  createFlow: MutationTrigger<
    MutationDefinition<
      CreateFlow,
      BaseQueryFn<
        void,
        unknown,
        ValidationError,
        Record<string, unknown>,
        MutationMeta
      >,
      CacheTagTypes,
      TransactionInfo,
      "sfApi"
    >
  >
): Promise<TransactionResponse> => {
  const weiAmountMonthly = ethers.utils
    .parseUnits(amount, "ether")
    .div(3600)
    .div(24)
    .div(30)
    .toString();
  const signerAddress = await provider.getSigner().getAddress();
  const chainId = (await provider.getNetwork()).chainId;

  try {
    const tx = await createFlow({
      senderAddress: signerAddress,
      receiverAddress: receiver,
      flowRateWei: weiAmountMonthly,
      chainId,
      superTokenAddress: streammableTokenAddress,
      waitForConfirmation: true,
    } as CreateFlow).unwrap();

    return { hash: tx.hash };
  } catch (error) {
    return {
      error: "Unexpected error creating stream flow.",
    };
  }
};
