import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { Web3Provider } from "@ethersproject/providers";
import { Web3Auth } from "@web3auth/modal";

interface Web3State {
  chainId: number;
  web3auth: Web3Auth | null;
  signerAddress?: string;
  provider?: Web3Provider;
}

const initialState: Web3State = {
  chainId: 97,
  web3auth: null,
  signerAddress: undefined,
  provider: undefined,
};

const web3Slice = createSlice({
  name: "web3",
  initialState,
  reducers: {
    reset: () => initialState,

    setWeb3Params(
      state,
      action: PayloadAction<{
        chainId: number;
        signerAddress: string;
        provider: Web3Provider;
      }>
    ) {
      const { chainId, signerAddress, provider } = action.payload;
      state.chainId = chainId;
      state.signerAddress = signerAddress;
      state.provider = provider;
    },
    setWeb3AuthState(state, action: PayloadAction<Web3Auth | null>) {
      state.web3auth = action.payload;
    },
  },
});

export const { reset, setWeb3Params, setWeb3AuthState } = web3Slice.actions;

const chainIdSelector = (state: RootState) => state.web3.chainId;
export const signerAddressSelector = (state: RootState) =>
  state.web3.signerAddress;
const providerSelector = (state: RootState) => state.web3.provider;
export const web3authSelector = (state: RootState) => state.web3.web3auth;

export const web3Selectors = (state: RootState) => {
  return {
    chainId: chainIdSelector(state),
    signerAddress: signerAddressSelector(state),
    provider: providerSelector(state),
    web3auth: web3authSelector(state),
  };
};

export default web3Slice.reducer;
