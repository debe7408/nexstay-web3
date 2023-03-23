import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loginReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
