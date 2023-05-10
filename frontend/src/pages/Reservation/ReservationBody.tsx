import { useState } from "react";
import CalendarComponent from "../../components/CalendarComponent";
import { DateRange } from "../../types/dates";
import { Property } from "../../types/property";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { reserveDates } from "../../api/manageReservations";
import { formatDate } from "../../helperFunctions/formatDate";
import { useSnackbar } from "notistack";
import { Button, Grid } from "@mui/material";

interface Props {
  propertyInfo: Property;
  unavailableDates: DateRange[];
}

const ReservationBody = ({ propertyInfo, unavailableDates }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [value, onChange] = useState<Value>(new Date());

  const handleSubmit = async () => {
    if (!Array.isArray(value)) {
      enqueueSnackbar("Please select a date range.", {
        variant: "error",
      });
      return;
    }
    const startDate = formatDate(value[0]!);
    const endDate = formatDate(value[1]!);

    const response = await reserveDates(
      propertyInfo.property_id,
      startDate,
      endDate
    );

    enqueueSnackbar(response.message, {
      variant: response.error ? "error" : "success",
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>Reservation</h1>
      </Grid>
      <Grid item xs={12}>
        <CalendarComponent
          unavailableDates={unavailableDates}
          value={value}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          disabled={!Array.isArray(value)}
          onClick={handleSubmit}
        >
          SUBMIT ME
        </Button>
      </Grid>
    </Grid>
  );
};

export default ReservationBody;
