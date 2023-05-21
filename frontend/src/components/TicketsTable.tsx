import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { formatDate } from "../helperFunctions/dateFunctions";
import CustomButton from "./CustomButton";
import { Ticket } from "../types/tickets";
import ViewReportDialog from "./ViewReportDialog";

interface ReservationsTableProps {
  tickets: Ticket[];
}

const TicketsTable: React.FC<ReservationsTableProps> = ({ tickets }) => {
  const navigate = useNavigate();
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
    <>
      <Table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Property ID</th>
            <th>Message</th>
            <th>Created</th>
            <th>Last updated</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>
              <td>{ticket.property_id}</td>
              <td>{ticket.message}</td>
              <td>{formatDate(ticket.created_at)}</td>
              <td>{formatDate(ticket.updated_at)}</td>
              <td>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={() => openTicket(ticket.id)}
                >
                  View
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ViewReportDialog
        open={openDialog}
        handleClose={handleClose}
        ticket={ticket}
      />
    </>
  );
};

export default TicketsTable;
