import React from "react";
import { useNavigate } from "react-router-dom";
import { Reservation } from "../types/reservation";
import { formatDate } from "../helperFunctions/dateFunctions";
import CustomButton from "./CustomButton";
import Timer from "./Timer";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

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
    <StyledPaper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Reservation ID</TableCell>
            <TableCell>Check-in Date</TableCell>
            <TableCell>Check-out Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reserved on</TableCell>
            <TableCell>Manage</TableCell>
            <TableCell>Accommodation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>#{reservation.id}</TableCell>
              <TableCell>{formatDate(reservation.start_date)}</TableCell>
              <TableCell>{formatDate(reservation.end_date)}</TableCell>
              <TableCell>
                <Timer
                  deadline={dayjs(reservation.booking_time)
                    .add(30, "minute")
                    .toDate()}
                  label={reservation.status.toLocaleUpperCase()}
                />
              </TableCell>
              <TableCell>{formatDate(reservation.booking_time)}</TableCell>
              <TableCell>
                <CustomButton
                  variant="contained"
                  color="primary"
                  onClick={() => openReservation(reservation.id)}
                >
                  Edit
                </CustomButton>
              </TableCell>
              <TableCell>
                <CustomButton
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => openProperty(reservation.property_id)}
                >
                  View
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)`
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  }
`;

export default ReservationsTable;
