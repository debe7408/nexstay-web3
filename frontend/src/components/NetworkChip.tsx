import { Chip } from "@mui/material";
import TokenIcon from "@mui/icons-material/Token";
import ErrorIcon from "@mui/icons-material/Error";
import { web3Selectors } from "../app/web3Slice";
import { useAppSelector } from "../app/hooks";

const NetworkChip = () => {
  const { provider } = useAppSelector(web3Selectors);

  return (
    <Chip
      color={provider ? "secondary" : "warning"}
      icon={provider ? <TokenIcon /> : <ErrorIcon />}
      label={
        provider
          ? `You're connected to: ${provider.network.name.toLocaleUpperCase()}`
          : "You're not connected to a network"
      }
      onClick={() =>
        provider && window.open(process.env.REACT_APP_BLOCK_EXPLORER, "_blank")
      }
    />
  );
};

export default NetworkChip;
