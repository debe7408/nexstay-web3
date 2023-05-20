import queryDb from "../databaseConnection";

type Review = {
  id: number;
  propertyId: number;
  userId: number;
  reservationId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export const createReview = async (
  propertyId: string,
  userId: number,
  reservationId: number,
  rating: number,
  comment: string
) => {
  const sql =
    "INSERT INTO reviews (property_id, user_id, reservation_id, rating, comment) VALUES (?, ?, ?, ?, ?)";
  const result = await queryDb(sql, [
    propertyId,
    userId,
    reservationId,
    rating,
    comment,
  ]);

  if (result.affectedRows === 0) return false;

  return true;
};

export const getReviewInfo = async (reviewId: string) => {
  const sql = "SELECT * FROM reviews WHERE id = ?";
  const result = await queryDb(sql, [reviewId]);

  if (result.length === 0) return false;

  return result[0] as Review;
};

export const getReviewInfoByPropertyId = async (propertyId: string) => {
  const sql = "SELECT * FROM reviews WHERE property_id = ?";
  const result = await queryDb(sql, [propertyId]);

  if (result.length === 0) return false;

  return result as Review[];
};
export const getReviewInfoByUserId = async (userId: number | string) => {
  const sql = "SELECT * FROM reviews WHERE user_id = ?";
  const result = await queryDb(sql, [userId]);

  if (result.length === 0) return false;

  return result as Review[];
};

export const getReviewInfoByReservationId = async (
  reservationId: number | string
) => {
  const sql = "SELECT * FROM reviews WHERE reservation_id = ?";
  const result = await queryDb(sql, [reservationId]);

  if (result.length === 0) return false;

  return result[0] as Review;
};
