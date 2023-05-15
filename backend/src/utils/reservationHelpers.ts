import queryDb from "../databaseConnection";
import { formatDateForMySQL } from "./formattingHelpers";

type Dates = {
  start_date: Date | string;
  end_date: Date | string;
};

type Reservation = {
  id: number;
  property_id: string;
  user_id: number;
  start_date: Date | string;
  end_date: Date | string;
  status: ReservationStatus;
  booking_time: Date | string;
};

export enum ReservationStatus {
  PENDING = "pending_payment",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  EXPIRED = "expired",
  CANCELED = "canceled",
}

export const getPropertyAvailability = async (
  propertyId: string,
  start_date: Date | string,
  end_date: Date | string
) => {
  start_date = formatDateForMySQL(start_date);
  end_date = formatDateForMySQL(end_date);

  const sql = `SELECT COUNT(*) as count FROM reservations WHERE 
	  property_id = ?
	  AND (status = 'confirmed' OR status = 'pending_payment' OR status = 'completed')
	  AND (
		(start_date BETWEEN ? AND ?)
		OR (end_date BETWEEN ? AND ?)
		OR (? BETWEEN start_date AND end_date)
		OR (? BETWEEN start_date AND end_date)
	  );
	`;

  const availability = await queryDb(sql, [
    propertyId,
    start_date,
    end_date,
    start_date,
    end_date,
    start_date,
    end_date,
  ]);

  return availability[0].count === 0 ? true : false;
};

export const reserveProperty = async (
  propertyId: string,
  userId: number,
  start_date: Date | string,
  end_date: Date | string
) => {
  start_date = formatDateForMySQL(start_date);
  end_date = formatDateForMySQL(end_date);

  const sql = `INSERT INTO reservations (user_id, property_id, start_date, end_date) VALUES (?, ?, ?, ?)`;

  const reservation = await queryDb(sql, [
    userId,
    propertyId,
    start_date,
    end_date,
  ]);

  return reservation.insertId;
};

export const getUnavailableDates = async (
  propertyId: string
): Promise<Dates[]> => {
  const sql = `SELECT start_date, end_date FROM reservations 
	  WHERE (status = 'confirmed' OR status = 'pending_payment' OR status = 'completed') 
	  AND property_id = ?`;

  const unavailableDates = await queryDb(sql, [propertyId]);

  return unavailableDates;
};

export const getUserReservations = async (userId: number) => {
  const sql = "SELECT * FROM reservations WHERE user_id = ?";
  const reservations: Reservation[] = await queryDb(sql, [userId]);
  return reservations;
};

export const getReservationInfo = async (reservationId: string) => {
  const sql = "SELECT * FROM reservations WHERE id = ?";
  const reservations: Reservation[] = await queryDb(sql, [reservationId]);
  return reservations[0];
};

export const changeReservationStatus = async (
  reservationId: string,
  status: ReservationStatus
) => {
  const sql = "UPDATE reservations SET status = ? WHERE id = ?";
  const reservation = await queryDb(sql, [status, reservationId]);

  if (reservation.affectedRows === 0) return false;
  return true;
};

export const checkIfReservationExists = async (
  reservationId: string
): Promise<boolean> => {
  const reservationExists = await queryDb(
    "SELECT * FROM reservations WHERE id = ?",
    [reservationId]
  );
  if (reservationExists.length === 0) {
    return false;
  }
  return true;
};

export const checkIfReservationBelongsToUser = async (
  reservationId: string,
  userId: number
): Promise<boolean> => {
  const reservation = await queryDb(
    "SELECT * FROM reservations WHERE id = ? AND user_id = ?",
    [reservationId, userId]
  );
  if (reservation.length === 0) {
    return false;
  }
  return true;
};

export const getReservationStatus = async (
  reservationId: string
): Promise<ReservationStatus> => {
  const reservation = await queryDb(
    "SELECT status FROM reservations WHERE id = ?",
    [reservationId]
  );
  return reservation[0].status;
};
