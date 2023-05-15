import { Chip } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import formatAddress from "../helperFunctions/formatAddress";

interface Props {
  address: string;
}
const AddressChip: React.FC<Props> = ({ address }) => {
  const addresLink =
    process.env.REACT_APP_BLOCK_EXPLORER + "address/" + address;

  return (
    <Chip
      color="info"
      variant="filled"
      size="small"
      icon={<LaunchIcon />}
      label={"Contract: " + formatAddress(address)}
      onClick={() => window.open(addresLink, "_blank")}
    />
  );
};

export default AddressChip;
