import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Typography,
  Grid,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import CalendarComponent from "../../../components/CalendarComponent";
import {
  getUnavailableDates,
  reserveDates,
} from "../../../api/manageReservations";
import { Property } from "../../../types/property";
import { DateRange } from "../../../types/dates";
import { Value } from "react-calendar/dist/cjs/shared/types";
import { themes } from "../../../constants/colors";
import Divider from "../../../components/DividerComponent";
import CustomButton from "../../../components/CustomButton";
import { useSnackbar } from "notistack";
import { formatDate } from "../../../helperFunctions/formatDate";

interface Props {
  property: Property;
}

const ReserveCard: React.FC<Props> = ({ property }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [selectedDates, setSelectedDates] = useState<Value>();
  const [unavailableDates, setUnavailableDates] = useState<DateRange[]>([]);
  const [selectedGuests, setSelectedGuests] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotalPrice = useCallback(() => {
    if (Array.isArray(selectedDates) && selectedDates[0] && selectedDates[1]) {
      const differenceInTime =
        selectedDates[1].getTime() - selectedDates[0].getTime();
      const differenceInDays = Math.round(
        differenceInTime / (1000 * 3600 * 24)
      );
      setTotalPrice(differenceInDays * property.price);
      return;
    }
    setTotalPrice(property.price);
  }, [selectedDates, property.price]);

  const fetchAvailability = useCallback(async () => {
    const response = await getUnavailableDates(property.property_id);
    if (!response.data || response.error) {
      console.log(response.error);
      return;
    }

    setUnavailableDates(response.data);
  }, [property.property_id]);

  const handleSubmit = async () => {
    if (!Array.isArray(selectedDates)) {
      enqueueSnackbar("Please select a date range.", {
        variant: "error",
      });
      return;
    }
    const startDate = formatDate(selectedDates[0]!);
    const endDate = formatDate(selectedDates[1]!);

    const { message, error, reservationId } = await reserveDates(
      property.property_id,
      startDate,
      endDate
    );

    enqueueSnackbar(message, {
      variant: error ? "error" : "success",
    });

    if (reservationId) {
      navigate(`/checkout/${reservationId}`);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  return (
    <CustomCard container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Ready to reserve?</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{`This property charges $${property.price} per night.`}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Select dates and guests</Typography>
      </Grid>
      <Grid item xs={12}>
        <CalendarComponent
          value={selectedDates}
          onChange={setSelectedDates}
          unavailableDates={unavailableDates}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel htmlFor="guests">Guests</InputLabel>
          <Select
            native
            value={selectedGuests}
            onChange={(e) => setSelectedGuests(Number(e.target.value))}
            inputProps={{
              name: "guests",
              id: "guests",
            }}
          >
            {[...Array(property.guests)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <CustomButton
          variant="contained"
          color="primary"
          fullWidth
          disabled={!Array.isArray(selectedDates)}
          onClick={handleSubmit}
        >
          Reserve
        </CustomButton>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">{`${
          totalPrice / property.price
        } nights x $${property.price}`}</Typography>
        <Divider />
        <Typography variant="body1">{`Your total: $${totalPrice}`}</Typography>
      </Grid>
    </CustomCard>
  );
};

const CustomCard = styled(Grid)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  background: linear-gradient(
    to bottom,
    ${themes.dark.main} 0%,
    ${themes.dark.dark_accent} 100%
  );
  color: ${themes.dark.text};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export default ReserveCard;
