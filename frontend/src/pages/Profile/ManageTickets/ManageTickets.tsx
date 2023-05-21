import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography, Container, styled } from "@mui/material";
import { Ticket } from "../../../types/tickets";
import TicketsTable from "../../../components/TicketsTable";
import { getUserTickets } from "../../../api/ticketAPI";

const ManageTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = useCallback(async () => {
    const { message, tickets, error } = await getUserTickets();
    if (error || !tickets) {
      console.log(message);
      return;
    }

    console.log(tickets);

    setTickets(tickets);
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <StyledContainer maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h1">
            Manage Your Tickets
          </Typography>
        </Grid>
      </Grid>

      <TicketsTable tickets={tickets} />
    </StyledContainer>
  );
};

export default ManageTicketsPage;

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`;
