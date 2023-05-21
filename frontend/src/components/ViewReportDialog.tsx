import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Chip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Ticket, TicketStatus } from "../types/tickets";
import Divider from "./DividerComponent";

interface Props {
  ticket: Ticket;
  open: boolean;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewReportDialog: React.FC<Props> = ({ open, handleClose, ticket }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <DialogTitle>
        Report #{ticket.id}
        <Chip
          variant="outlined"
          label={ticket.status}
          color={ticket.status === TicketStatus.OPEN ? "success" : "info"}
          sx={{ marginLeft: 1 }}
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          We are working hard to make sure that our platform is safe and secure
          for everyone. Please wait until we investigate your report. Thank you!
        </DialogContentText>

        <TextContainer>
          <Label>Submitted message:</Label>
          <Text>{ticket.message}</Text>
        </TextContainer>
        <Divider />
        {ticket.resolution && (
          <TextContainer>
            <Label>Resolution:</Label>
            <Text>{ticket.resolution}</Text>
          </TextContainer>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color={"error"}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 15px;
`;

const Text = styled.p`
  font-size: 15px;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export default ViewReportDialog;
