import { Property, User } from "../common/types";
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

export const checkIfUserHasProperties = async (
  userId: number
): Promise<Property[] | undefined> => {
  const sql = `SELECT * FROM properties WHERE owner_id = ?`;
  const response = await queryDb(sql, [userId]);
  if (response.length === 0) {
    return;
  }

  response.forEach((property: Property) => {
    const amenities = JSON.parse(property.amenities);
    const safetyAmenities = JSON.parse(property.safety_amenities);

    property.amenities = amenities;
    property.safety_amenities = safetyAmenities;
  });

  return response;
};
