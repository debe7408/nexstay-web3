import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { postTicket } from "../../../api/ticketAPI";
import { useSnackbar } from "notistack";

interface Props {
  propertyId: number;
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

const ReportDialog: React.FC<Props> = ({ open, handleClose, propertyId }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async () => {
    if (!message) {
      setError(true);
      return;
    }
    setError(false);

    const { message: responseMessage, error } = await postTicket(
      propertyId,
      message
    );

    enqueueSnackbar(responseMessage, {
      variant: error ? "error" : "success",
    });

    if (!error) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <DialogTitle>{"Please tell us more about the issue"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Trip.io is committed to providing a safe and secure marketplace for
          our community. If you believe someone is violating our policies, let
          us know by completing the form below. We'll review your report and
          take appropriate action.{" "}
          <b>
            Make sure to provide as much information as possible to help us
            investigate your report.
          </b>
        </DialogContentText>

        <TextField
          autoFocus
          multiline
          margin="dense"
          id="message"
          label="Message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          required
          rows={3}
          helperText={error ? "Please enter a message." : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color={"error"}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color={"success"}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
