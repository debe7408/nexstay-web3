import React, { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Reservation, ReservationStatus } from "../../types/reservation";
import { formatDate } from "../../helperFunctions/dateFunctions";
import ReusableTable from "./components/ReusableTable";
import { getAllReservations } from "../../api/adminAPI";

const headers = [
  "ID",
  "Property ID",
  "User ID",
  "Duration",
  "Status",
  "Booking Time",
];

const ReservatioManagement: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [reservationData, setReservationData] = useState<Reservation[]>([]);

  const fetchReservationData = useCallback(async () => {
    const { message, error, reservations } = await getAllReservations();

    if (error || !reservations) {
      enqueueSnackbar(message, { variant: "error" });
    } else {
      setReservationData(reservations);
    }
  }, []);

  useEffect(() => {
    fetchReservationData();
  }, [fetchReservationData]);

  const onClickHandler = (rowIndex: number) => {
    console.log(reservationData.at(rowIndex));
  };

  return (
    <ReusableTable
      headers={headers}
      data={reservationData.map((reservation) => [
        reservation.id,
        reservation.property_id,
        reservation.user_id,
        formatDate(reservation.start_date) +
          " - " +
          formatDate(reservation.end_date),
        reservation.status,
        formatDate(reservation.booking_time),
      ])}
      onClickHandler={onClickHandler}
    />
  );
};

export default ReservatioManagement;
