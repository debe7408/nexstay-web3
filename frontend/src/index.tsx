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
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const Index = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = React.useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = React.useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#000000" : "#836de9",
          },
          secondary: {
            main: mode === "light" ? "#BFB6DA" : "#5956a9",
          },
          background: {
            default: mode === "light" ? "#f9fbf3" : "#08041b",
            paper: mode === "light" ? "#D1DAB6" : "#100835",
          },
          text: {
            primary: mode === "light" ? "#090c04" : "#ddd7f9",
            disabled: mode === "light" ? "grey" : "rgba(255,255,255,0.4)",
          },
        },
        typography: {
          fontFamily: "Inter",
        },
        shape: {
          borderRadius: 10,
        },

        components: {
          MuiAppBar: {
            defaultProps: {
              sx: {
                backgroundColor: mode === "light" ? "#FFFFFF" : "inherit",
                color: mode === "light" ? "black" : "#FFFFFF",
                boxShadow: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <CssBaseline />
              <GlobalStyles />
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </BrowserRouter>
    </Provider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Index />);
