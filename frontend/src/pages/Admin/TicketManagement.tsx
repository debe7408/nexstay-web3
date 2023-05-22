import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { formatDate } from "../../helperFunctions/dateFunctions";
import { Ticket } from "../../types/tickets";
import ReusableTable from "./components/ReusableTable";
import { getAllTickets } from "../../api/adminAPI";

const headers = [
  "ID",
  "Property ID",
  "User ID",
  "Message",
  "Status",
  "Created",
  "Updated",
];

const TicketManagement: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [ticketData, setTicketData] = useState<Ticket[]>([]);

  const fetchTicketData = useCallback(async () => {
    const { message, error, tickets } = await getAllTickets();

    if (error || !tickets) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      setTicketData(tickets);
    }
  }, []);

  useEffect(() => {
    fetchTicketData();
  }, [fetchTicketData]);

  const onClickHandler = (rowIndex: number) => {
    console.log(ticketData.at(rowIndex));
  };

  return (
    <ReusableTable
      headers={headers}
      data={ticketData.map((ticket) => [
        ticket.id,
        ticket.property_id,
        ticket.user_id,
        ticket.message,
        ticket.status,
        formatDate(ticket.created_at),
        formatDate(ticket.updated_at),
      ])}
      onClickHandler={onClickHandler}
    />
  );
};

export default TicketManagement;
