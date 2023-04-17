import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoginState {
  loggedIn: boolean;
  token: string;
}

const initialState: LoginState = {
  loggedIn: false,
  token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.loggedIn;
export const selectAuthToken = (state: RootState) => state.login.token;

export default loginSlice.reducer;
