import { queryDb } from "../databaseConnection";
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
  status: string;
  booking_time: Date | string;
};

export const checkIfPropertyExists = async (
  propertyId: string
): Promise<boolean> => {
  const propertyExists = await queryDb(
    "SELECT * FROM properties WHERE id = ?",
    [propertyId]
  );
  if (propertyExists.length === 0) {
    return false;
  }
  return true;
};

export const checkIfPropertyBookmarked = async (
  userId: number,
  propertyId: string
): Promise<boolean> => {
  const alreadyBookmarked = await queryDb(
    "SELECT * FROM saved_properties WHERE user_id = ? AND property_id = ?",
    [userId, propertyId]
  );

  if (alreadyBookmarked.length > 0) {
    return true;
  }
  return false;
};

export const getBookmaredProperties = async (userId: number) => {
  const sql = `
    SELECT properties.* FROM properties
    JOIN saved_properties ON properties.id = saved_properties.property_id
    WHERE saved_properties.user_id = ?;
  `;

  const properties = await queryDb(sql, [userId]);
  return properties;
};

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

  return reservation;
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
