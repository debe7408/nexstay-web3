import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loginReducer from "./loginSlice";
import web3Slice from "./web3Slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    web3: web3Slice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
