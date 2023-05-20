import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { User } from "../types/user";
import { getSingleUserInfo } from "../api/userAPI";

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
    updateFullUserInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const fetchAndUpdateUserInfo = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("login/fetchAndUpdateUserInfo", async (_, { getState, dispatch }) => {
  const userId = selectUserId(getState());
  if (!userId) {
    return;
  }

  const { hasError, user: updatedUser } = await getSingleUserInfo();
  if (!hasError && updatedUser) dispatch(updateFullUserInfo(updatedUser));
});

export const { login, logout, updateFullUserInfo } = loginSlice.actions;

export const selectLoginState = (state: RootState) => state.login.loggedIn;
export const selectAuthToken = (state: RootState) => state.login.token;
export const selectUserId = (state: RootState) => state.login.user?.id;
export const selectUser = (state: RootState) => state.login.user;

export default loginSlice.reducer;
