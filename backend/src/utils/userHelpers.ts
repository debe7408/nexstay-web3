import { Property, User } from "../common/types";
import { queryDb } from "../databaseConnection";

export const createUser = async (publicAddress: string): Promise<number> => {
  const sql = `INSERT INTO users (publicAddress) VALUES (?)`;
  const { insertId } = await queryDb(sql, [publicAddress]);

  return insertId;
};

export const getUserType = async (
  userId: number
): Promise<string | undefined> => {
  const sql = `SELECT type FROM users WHERE id = ? LIMIT 1`;
  const response = await queryDb(sql, [userId]);
  if (response.length === 0) {
    return;
  }
  return response[0].type;
};

export const getUserInfo = async (
  userId: number
): Promise<User | undefined> => {
  const sql = `SELECT * FROM users WHERE id = ? LIMIT 1`;
  const response = await queryDb(sql, [userId]);
  if (response.length === 0) {
    return;
  }
  return response[0];
};

export const updateUserInfo = async (
  publicAddress: string,
  firstName: string,
  lastName: string,
  email: string,
  age: number
) => {
  const sql = `UPDATE users SET firstName = ?, lastName = ?, email = ?, age = ? WHERE publicAddress = ?`;
  const response = await queryDb(sql, [
    firstName,
    lastName,
    email,
    age,
    publicAddress,
  ]);

  if (!response || response.affectedRows === 0) {
    return false;
  }
  return true;
};

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
  const sql =
    "SELECT * FROM user_properties WHERE user_properties.owner_id = ?";
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
