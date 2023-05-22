import React from "react";
import {
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import { colors } from "../../../constants/colors";

interface Props {
  headers: string[];
  data: any[][];
  onClickHandler: (rowIndex: number) => void;
}

const ReusableTable: React.FC<Props> = ({ headers, data, onClickHandler }) => {
  return (
    <StyledTableContainer as={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((rowData, rowIndex) => (
            <StyledTableRow
              key={rowIndex}
              onClick={() => onClickHandler(rowIndex)}
            >
              {rowData.map((cellData, cellIndex) => (
                <TableCell key={cellIndex}>{cellData}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </MuiTable>
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled(TableContainer)`
  max-width: 100%;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: ${colors.pastelPurple};
  }

  & > * {
    font-weight: bold;
  }

  &:hover {
    background-color: ${colors.navyBlue};
    & > * {
      color: ${colors.white};
      cursor: pointer;
    }
  }
`;

export default ReusableTable;
