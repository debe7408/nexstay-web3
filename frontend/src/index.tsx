import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./app/store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider>
        <CssBaseline />
        <GlobalStyles />
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);
