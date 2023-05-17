import { useState } from "react";
import {
  Alert,
  AlertTitle,
  AlertColor,
  IconButton,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReservationStatus } from "../types/reservation";

interface Props {
  status: ReservationStatus;
}

const statusAlerts = {
  [ReservationStatus.PENDING]: {
    title: "Pending payment.",
    body: "Reservation is awaiting payment. Please complete your payment to confirm your reservation.",
    severity: "warning",
  },
  [ReservationStatus.CONFIRMED]: {
    title: "Confirmed!",
    body: "Your payment has been confirmed. Now all that's left is to wait for your trip!",
    severity: "info",
  },
  [ReservationStatus.CANCELED]: {
    title: "Cancelled!",
    body: "Reservation has been cancelled by the host.",
    severity: "error",
  },
  [ReservationStatus.COMPLETED]: {
    title: "Completed!",
    body: "We hope you enjoyed your stay! Please leave a review for the host at the bottom of this page.",
    severity: "success",
  },
  [ReservationStatus.EXPIRED]: {
    title: "Expired :(",
    body: "Reservation has expired. If you wish to book this property, please make a new reservation.",
    severity: "error",
  },
};

const PaymentInfoAlert: React.FC<Props> = ({ status }) => {
  const [open, setOpen] = useState(true);
  const alert = statusAlerts[status] || statusAlerts[ReservationStatus.PENDING];

  return (
    <Collapse
      in={open}
      sx={{
        width: "100%",
      }}
    >
      <Alert
        severity={alert.severity as AlertColor}
        variant="filled"
        onClose={() => setOpen(false)}
        action={
          <IconButton
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.body}
      </Alert>
    </Collapse>
  );
};

export default PaymentInfoAlert;
