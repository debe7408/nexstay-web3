import { Chip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import formatAddress from "../helperFunctions/formatAddress";

interface Props {
  address: string;
  transaction?: boolean;
}
const AddressChip: React.FC<Props> = ({ address, transaction }) => {
  const addresLink =
    process.env.REACT_APP_BLOCK_EXPLORER +
    (transaction ? "tx/" : "address/") +
    address;
  const label = transaction ? "Transaction: " : "Contract: ";

  return (
    <Chip
      color="info"
      variant="filled"
      size="small"
      icon={<LaunchIcon />}
      label={label + formatAddress(address)}
      onClick={() => window.open(addresLink, "_blank")}
    />
  );
};

export default AddressChip;
