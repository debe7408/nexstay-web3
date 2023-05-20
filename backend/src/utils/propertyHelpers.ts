import { queryDb } from "../databaseConnection";
import { Property, PropertyWithOwner } from "../common/types";

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

  const properties: Property[] = await queryDb(sql, [userId]);
  return properties;
};

export const getAllProperties = async () => {
  const sql = "SELECT * FROM properties";

  const properties: Property[] = await queryDb(sql);

  return properties;
};

export const getUsersProperties = async (userId: number) => {
  const sql = "SELECT * FROM properties WHERE owner_id = ?";

  const properties: Property[] = await queryDb(sql, [userId]);
  return properties;
};

export const getPropertyByID = async (propertyId: string) => {
  const sql = `
    SELECT 
      properties.*, 
      users.publicAddress AS ownerAddress, 
      users.email as ownerEmail, 
      users.firstName as ownerFirstName, 
      users.lastName as ownerLastName 
    FROM properties 
    JOIN users ON properties.owner_id = users.id 
    WHERE properties.id = ?`;

  const response: PropertyWithOwner[] = await queryDb(sql, [propertyId]);

  if (response.length === 0) {
    return null;
  }

  response[0].amenities = JSON.parse(response[0].amenities);
  response[0].safety_amenities = JSON.parse(response[0].safety_amenities);

  return response[0];
};

export const removeProperty = async (
  propertyId: string,
  userID: string | number
) => {
  const sql = "DELETE FROM properties WHERE id = ? AND owner_id = ?";

  const response = await queryDb(sql, [propertyId, userID]);

  if (response.affectedRows === 0) {
    return false;
  }

  return true;
};
