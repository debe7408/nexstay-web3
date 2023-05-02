import { Typography } from "@mui/material";

interface Props {
  message?: string;
}

const ErrorComponent: React.FC<Props> = ({ message }) => {
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
      {message ? message : "This field is required"}
    </Typography>
  );
};

export default ErrorComponent;
