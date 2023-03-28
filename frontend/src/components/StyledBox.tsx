import { Box } from "@mui/material";
import styled, { CSSObject } from "styled-components";

interface StyledBoxProps {
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  textAlign?: string;
  customstyles?: CSSObject;
}

const StyledBox = styled(Box)<StyledBoxProps>`
  display: ${({ display }) => display || "flex"};
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  text-align: ${({ textAlign }) => textAlign || "center"};
  ${({ customstyles }) => customstyles};
`;

export default StyledBox;
