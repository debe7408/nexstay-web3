import { Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  count: number;
  setCount: (count: number) => void;
}

const StepperButton: React.FC<Props> = ({ count, setCount }) => {
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        displayDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <IconButton
        disabled={count === 1}
        size="small"
        onClick={decrement}
        color="secondary"
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="h5">{count}</Typography>
      <IconButton size="small" onClick={increment} color="secondary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default StepperButton;
