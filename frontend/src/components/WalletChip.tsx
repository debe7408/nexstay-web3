import { Chip } from "@mui/material";
import WalletIcon from "@mui/icons-material/Wallet";
import { web3Selectors } from "../app/web3Slice";
import { useAppSelector } from "../app/hooks";
import formatAddress from "../helperFunctions/formatAddress";

interface Props {
  address?: string;
}

const WalletChip: React.FC<Props> = ({ address }) => {
  const { signerAddress } = useAppSelector(web3Selectors);

  const walletLink =
    process.env.REACT_APP_BLOCK_EXPLORER +
    "address/" +
    (address ? address : signerAddress);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    window.open(walletLink, "_blank");
  };

  return (
    <Chip
      color="info"
      variant="outlined"
      icon={<WalletIcon />}
      label={formatAddress(address ? address : signerAddress)}
      onClick={(event) => handleClick(event)}
    />
  );
};

export default WalletChip;
