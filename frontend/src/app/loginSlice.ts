import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoginState {
  loggedIn: boolean;
  token: string;
  userId?: number;
}

interface LoginPayload {
  token: string;
  userId: number;
}

const initialState: LoginState = {
  loggedIn: false,
  token: "",
  userId: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.loggedIn;
export const selectAuthToken = (state: RootState) => state.login.token;
export const selectUserId = (state: RootState) => state.login.userId;

export default loginSlice.reducer;
