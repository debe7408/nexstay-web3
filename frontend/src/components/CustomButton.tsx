import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton = ({ loading, children, ...props }: CustomButtonProps) => {
  return (
    <Button {...props}>
      {loading ? <CircularProgress size={24} color="primary" /> : children}
    </Button>
  );
};

export default CustomButton;
