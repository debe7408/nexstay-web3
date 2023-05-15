import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "../constants/colors";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.purple,
      contrastText: colors.white,
    },
    primary: {
      main: colors.navyBlue,
      contrastText: colors.white,
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    secondary: Palette["primary"];
    primary: Palette["primary"];
  }

  interface PaletteOptions {
    secondary?: PaletteOptions["primary"];
    primary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    secondary: true;
    primary: true;
  }
}

const CustomButton = ({ loading, children, ...props }: CustomButtonProps) => {
  const spinnerColor = props.color === "primary" ? "secondary" : "primary";

  return (
    <ThemeProvider theme={theme}>
      <Button {...props}>
        {loading ? (
          <CircularProgress size={24} color={spinnerColor} />
        ) : (
          children
        )}
      </Button>
    </ThemeProvider>
  );
};

export default CustomButton;
