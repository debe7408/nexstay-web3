import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { Reservation } from "../types/reservation";
import { formatDate } from "../helperFunctions/dateFunctions";
import CustomButton from "./CustomButton";
import Timer from "./Timer";
import dayjs from "dayjs";

interface ReservationsTableProps {
  reservations: Reservation[];
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  reservations,
}) => {
  const navigate = useNavigate();

  const openProperty = (propertyId: number) => {
    navigate(`/accommodation/${propertyId}`);
  };

  const openReservation = (reservationId: number) => {
    navigate(`/checkout/${reservationId}`);
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Status</th>
            <th>Reserved on</th>
            <th>Manage</th>
            <th>Accommodation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>#{reservation.id}</td>
              <td>{formatDate(reservation.start_date)}</td>
              <td>{formatDate(reservation.end_date)}</td>
              <td>
                <Timer
                  deadline={dayjs(reservation.booking_time)
                    .add(30, "minute")
                    .toDate()}
                  label={reservation.status.toLocaleUpperCase()}
                />
              </td>
              <td>{formatDate(reservation.booking_time)}</td>
              <td>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={() => openReservation(reservation.id)}
                >
                  Edit
                </CustomButton>
              </td>
              <td>
                <CustomButton
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => openProperty(reservation.property_id)}
                >
                  View
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ReservationsTable;
