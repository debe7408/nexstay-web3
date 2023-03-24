import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoginState {
  value: boolean;
  token: string;
  emailAddress: string;
}

const initialState: LoginState = {
  value: false,
  token: "",
  emailAddress: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<[token: string, emailAddress: string]>
    ) => {
      state.value = true;
      state.token = action.payload[0];
      state.emailAddress = action.payload[1].toLowerCase();
    },
    logout: (state) => {
      state.value = false;
      state.token = "";
      state.emailAddress = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.value;
export const selectAuthToken = (state: RootState) => state.login.token;
export const selectEmailAddress = (state: RootState) =>
  state.login.emailAddress;

export default loginSlice.reducer;
