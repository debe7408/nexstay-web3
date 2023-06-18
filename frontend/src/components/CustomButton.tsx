import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { colors } from "../constants/colors";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton = ({ loading, children, ...props }: CustomButtonProps) => {
  const spinnerColor = props.color === "primary" ? "secondary" : "primary";

  return (
    <Button {...props}>
      {loading ? <CircularProgress size={24} color={spinnerColor} /> : children}
    </Button>
  );
};

export default CustomButton;
