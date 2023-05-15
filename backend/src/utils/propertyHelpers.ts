import { queryDb } from "../databaseConnection";

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
