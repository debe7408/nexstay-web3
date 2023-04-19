import { User } from "../common/types";
import { queryDb } from "../databaseConnection";

/**
 * Checks if the user exist in database.
 *
 * @param {string} publicAddress - Public ETH wallet address of the user
 * @returns {User} User object or undefined if user does not exist
 *
 */

export const checkIfUserExist = async (
  publicAddress: string
): Promise<User | undefined> => {
  const sql = `SELECT * FROM users WHERE publicAddress = ? LIMIT 1`;
  const response = await queryDb(sql, [publicAddress]);
  if (response.length === 0) {
    return;
  }
  return response[0];
};
