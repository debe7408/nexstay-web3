import React from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import styled from "styled-components";

interface ReviewTableProps {
  data: { [key: string]: any };
}

const TableHeadCell = styled(TableRow)`
  margin-bottom: 10px;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  font-weight: 600;
  text-transform: uppercase;
`;

const TableBodyCell = styled(TableCell)`
  && {
    padding: 0.5rem 0;
    margin-bottom: 10px;
  }
`;
const ReviewTable: React.FC<ReviewTableProps> = ({ data }) => {
  const renderTableCell = (value: any): JSX.Element => {
    if (Array.isArray(value)) {
      return (
        <>
          {value.map((item: any) => (
            <Typography key={item} variant="subtitle1">
              {item}
            </Typography>
          ))}
        </>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <Table>
          <Grid item>
            <TableBody>
              {Object.keys(value).map((key) => (
                <TableRow key={key}>
                  <TableHeadCell>{`${key}: `}</TableHeadCell>
                  <TableBodyCell>{value[key]}</TableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Grid>
        </Table>
      );
    }

    return (
      <Typography key={value} variant="subtitle1">
        {value}
      </Typography>
    );
  };

  return (
    <Grid container>
      {Object.keys(data).map((key) => (
        <Grid item xs={12} md={12} lg={12}>
          <TableRow key={key}>
            <TableHeadCell>{key}</TableHeadCell>
            <TableBodyCell>{renderTableCell(data[key])}</TableBodyCell>
          </TableRow>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReviewTable;
