import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/RouteComponent";
import GlobalStyles from "./GlobalStyles";
import { SnackbarProvider } from "notistack";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <SnackbarProvider>
      <CssBaseline />
      <GlobalStyles />
      <App />
      <Router />
    </SnackbarProvider>
  </BrowserRouter>
);
