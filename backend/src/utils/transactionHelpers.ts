import queryDb from "../databaseConnection";

type Transaction = {
  reservationId: string;
  userId: number;
  hash: string;
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
