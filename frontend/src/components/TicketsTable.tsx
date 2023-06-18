import React, { useState } from "react";
import { formatDate } from "../helperFunctions/dateFunctions";
import CustomButton from "./CustomButton";
import { Ticket } from "../types/tickets";
import ViewReportDialog from "./ViewReportDialog";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import styled from "styled-components";

interface ReservationsTableProps {
  tickets: Ticket[];
}

const TicketsTable: React.FC<ReservationsTableProps> = ({ tickets }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);

  const openTicket = (ticketId: number) => {
    const ticket = tickets.find((ticket) => ticket.id === ticketId);

    if (!ticket) {
      alert("Something went wrong opening the ticket");
      return;
    }

    setTicket(ticket);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <StyledPaper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Property ID</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Last updated</TableCell>
            <TableCell>View</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>#{ticket.id}</TableCell>
              <TableCell>{ticket.property_id}</TableCell>
              <TableCell>{ticket.message}</TableCell>
              <TableCell>{formatDate(ticket.created_at)}</TableCell>
              <TableCell>{formatDate(ticket.updated_at)}</TableCell>
              <TableCell>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={() => openTicket(ticket.id)}
                >
                  View
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ViewReportDialog
        open={openDialog}
        handleClose={handleClose}
        ticket={ticket}
      />
    </StyledPaper>
  );
};

export default TicketsTable;

const StyledPaper = styled(Paper)`
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  }
`;
