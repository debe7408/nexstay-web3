import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User } from "../types/user";

interface LoginState {
  loggedIn: boolean;
  token: string;
  user?: User;
}

interface LoginPayload {
  token: string;
  user: User;
}

const initialState: LoginState = {
  loggedIn: false,
  token: "",
  user: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.loggedIn;
export const selectAuthToken = (state: RootState) => state.login.token;
export const selectUserId = (state: RootState) => state.login.user?.id;

export default loginSlice.reducer;
