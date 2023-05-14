import { Chip } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { web3Selectors } from "../app/web3Slice";
import { useAppSelector } from "../app/hooks";
import formatAddress from "../helperFunctions/formatAddress";

const WalletChip = () => {
  const { signerAddress } = useAppSelector(web3Selectors);

  const walletLink =
    process.env.REACT_APP_BLOCK_EXPLORER + "address/" + signerAddress;

  return (
    <Chip
      color="info"
      variant="outlined"
      icon={<WalletIcon />}
      label={formatAddress(signerAddress)}
      onClick={() => window.open(walletLink, "_blank")}
    />
  );
};

export default WalletChip;
