import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import styled from "styled-components";

interface ToolTipProps {
  title: string;
}
const ToolTipIcon: React.FC<ToolTipProps> = ({ title }) => {
  return (
    <Tooltip title={title} placement="top">
      <IconButton>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

const Icon = styled(HelpOutlineIcon)`
  font-size: 1rem;
`;

export default ToolTipIcon;
