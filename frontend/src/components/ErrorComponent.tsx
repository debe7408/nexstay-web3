import { Typography } from "@mui/material";

const ErrorComponent: React.FC = () => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        display: "flex",
        color: "red",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderBottom: "1px solid red",
      }}
    >
      This field is required
    </Typography>
  );
};

export default ErrorComponent;
