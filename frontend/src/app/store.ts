import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import loginReducer from "./loginSlice";
import web3Slice from "./web3Slice";
import {
  allSubgraphSliceEndpoints,
  createApiWithReactHooks,
  initializeSfApiSlice,
  initializeSubgraphSlice,
  initializeSfTransactionSlice,
} from "@streamable-finance/sdk-redux";

export const { sfApi } = initializeSfApiSlice(createApiWithReactHooks);
export const { sfTransactions } = initializeSfTransactionSlice();
export const sfSubgraph = initializeSubgraphSlice(
  createApiWithReactHooks
).injectEndpoints(allSubgraphSliceEndpoints);

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    web3: web3Slice,
    sfApi: sfApi.reducer,
    sfTransactions: sfTransactions.reducer,
    sfSubgraph: sfSubgraph.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(sfApi.middleware)
      .concat(sfSubgraph.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
