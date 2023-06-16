import { Framework } from "@streamable-finance/sdk-core";
import { Web3Provider } from "@ethersproject/providers";
import {
  setFrameworkForSdkRedux,
  setSignerForSdkRedux,
  TransactionInfo,
  ValidationError,
} from "@streamable-finance/sdk-redux";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";

let _streamSDKInstance: Framework;

export type StreamSDK = {
  instance?: Framework;
};

export type Tx =
  | {
      data: TransactionInfo;
    }
  | {
      error: ValidationError | SerializedError;
    };

export const streamSDK: StreamSDK = {
  get instance() {
    if (!_streamSDKInstance) return undefined;

    return _streamSDKInstance;
  },
  set instance(_) {
    throw "Cannot set SDK dirrectly. Call initStreamSDK function.";
  },
};

export const initStreamSDK = async (
  provider: Web3Provider,
  chainId?: number
) => {
  const currentNetwork = await provider.getNetwork();
  const newChainId = chainId || currentNetwork.chainId;

  const newSDK = await Framework.create({
    chainId: newChainId,
    provider: provider,
  });

  setFrameworkForSdkRedux(newChainId, newSDK);
  setSignerForSdkRedux(newChainId, provider.getSigner());

  _streamSDKInstance = newSDK;

  return newSDK;
};
