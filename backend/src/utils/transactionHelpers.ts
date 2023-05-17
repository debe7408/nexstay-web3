import queryDb from "../databaseConnection";

type Transaction = {
  reservationId: string;
  userId: number;
  hash: string;
  payment_time?: Date;
};

export const storeTransaction = async (transaction: Transaction) => {
  const sql =
    "INSERT INTO transactions (reservation_id, user_id, hash) VALUES (?, ?, ?)";
  const result = await queryDb(sql, [
    transaction.reservationId,
    transaction.userId,
    transaction.hash,
  ]);

  if (result.affectedRows === 0) return false;

  return true;
};

export const getTransactionInfo = async (
  userId: number,
  reservationId: string
) => {
  const sql =
    "SELECT * FROM transactions WHERE user_id = ? AND reservation_id = ?";
  const result = await queryDb(sql, [userId, reservationId]);

  if (result.length === 0) return false;

  return result[0] as Transaction;
};
