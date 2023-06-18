import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Reservation } from "../../../types/reservation";
import ReservationsTable from "../../../components/ReservationTable";
import CustomButton from "../../../components/CustomButton";
import { getUsersReservations } from "../../../api/manageReservations";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

const ManageReservationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingDate, setBookingDate] = useState<Dayjs | null>();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchReservations = useCallback(async () => {
    const response = await getUsersReservations();
    if (!response.data || response.error) {
      console.log(response.error);
      return;
    }

    setReservations(response.data);
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const filteredReservations = reservations.filter((reservation) => {
    const searchTermMatch =
      reservation.id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.status.toLowerCase().includes(searchTerm.toLowerCase());

    const bookingDateMatch =
      !bookingDate ||
      dayjs(reservation.booking_time)
        .startOf("day")
        .isSame(bookingDate.startOf("day"));

    return searchTermMatch && bookingDateMatch;
  });

  const handleAddReservation = () => {
    navigate("/");
  };

  return (
    <StyledContainer maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h1">
            Manage Your Reservations
          </Typography>
        </Grid>
        <Grid item>
          <CustomButton
            variant="outlined"
            color="primary"
            onClick={handleAddReservation}
          >
            Start exploring!
          </CustomButton>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box mt={2} mb={2}>
              <TextField
                label="Search by Reservation ID or Status"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box mt={2} mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Filter by Booking Date"
                  value={bookingDate}
                  onChange={(newDate) => setBookingDate(newDate)}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <ReservationsTable reservations={filteredReservations} />
    </StyledContainer>
  );
};

export default ManageReservationsPage;

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
`;
