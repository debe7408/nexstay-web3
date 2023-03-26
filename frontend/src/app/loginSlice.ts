import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoginState {
  value: boolean;
  token: string;
}

const initialState: LoginState = {
  value: false,
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.value = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.value = false;
      state.token = "";
    },
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.value;
export const selectAuthToken = (state: RootState) => state.login.token;

export default loginSlice.reducer;
