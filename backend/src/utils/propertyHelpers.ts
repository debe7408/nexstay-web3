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
    SELECT properties_with_pictures.* FROM properties_with_pictures
    JOIN saved_properties ON properties_with_pictures.id = saved_properties.property_id
    WHERE saved_properties.user_id = ?;
  `;

  const response = await queryDb(sql, [userId]);

  if (response.length === 0) {
    return false;
  }

  response.forEach((property: any) => {
    property.amenities = JSON.parse(property.amenities);
    property.safety_amenities = JSON.parse(property.safety_amenities);
    property.picture_paths = property.picture_paths
      ? property.picture_paths.split(",")
      : [];
  });

  return response as Property[];
};

export const getAllProperties = async () => {
  const sql = `SELECT * FROM properties_with_pictures`;

  const response = await queryDb(sql);

  if (response.length === 0) {
    return false;
  }

  response.forEach((property: any) => {
    property.amenities = JSON.parse(property.amenities);
    property.safety_amenities = JSON.parse(property.safety_amenities);
    property.picture_paths = property.picture_paths
      ? property.picture_paths.split(",")
      : [];
  });

  return response as Property[];
};

export const getPropertiesByPage = async (
  skip: number,
  limit: number,
  country: string | null
) => {
  let sql = `SELECT * FROM properties_with_pictures`;

  if (country) {
    sql += ` WHERE country = '${country}'`;
  }

  sql += ` LIMIT ${skip}, ${limit}`;

  const response = await queryDb(sql);

  if (response.length === 0) {
    return [] as Property[];
  }

  response.forEach((property: any) => {
    property.amenities = JSON.parse(property.amenities);
    property.safety_amenities = JSON.parse(property.safety_amenities);
    property.picture_paths = property.picture_paths
      ? property.picture_paths.split(",")
      : [];
  });

  return response as Property[];
};

export const getAllPropertiesWithOwner = async () => {
  const sql = `
    SELECT
    properties_with_pictures.*,
      users.publicAddress AS ownerAddress,
      users.email as ownerEmail,
      users.firstName as ownerFirstName,
      users.lastName as ownerLastName
    FROM properties_with_pictures
    JOIN users ON properties_with_pictures.owner_id = users.id
  `;
  const response = await queryDb(sql);

  if (response.length === 0) {
    return false;
  }

  response.forEach((property: any) => {
    property.amenities = JSON.parse(property.amenities);
    property.safety_amenities = JSON.parse(property.safety_amenities);
    property.picture_paths = property.picture_paths
      ? property.picture_paths.split(",")
      : [];
  });

  return response as PropertyWithOwner[];
};

export const getUsersProperties = async (userId: number) => {
  const sql = "SELECT * FROM properties_with_pictures WHERE owner_id = ?";

  const response = await queryDb(sql, [userId]);

  if (response.length === 0) {
    return false;
  }

  response.forEach((property: any) => {
    property.amenities = JSON.parse(property.amenities);
    property.safety_amenities = JSON.parse(property.safety_amenities);
    property.picture_paths = property.picture_paths
      ? property.picture_paths.split(",")
      : [];
  });

  return response as Property[];
};

export const getPropertyByID = async (propertyId: string) => {
  const sql = `
    SELECT 
      properties_with_pictures.*, 
      users.publicAddress AS ownerAddress, 
      users.email as ownerEmail, 
      users.firstName as ownerFirstName, 
      users.lastName as ownerLastName 
    FROM properties_with_pictures 
    JOIN users ON properties_with_pictures.owner_id = users.id 
    WHERE properties_with_pictures.id = ?`;

  const response = await queryDb(sql, [propertyId]);

  if (response.length === 0) {
    return null;
  }

  response[0].amenities = JSON.parse(response[0].amenities);
  response[0].safety_amenities = JSON.parse(response[0].safety_amenities);
  response[0].picture_paths = response[0].picture_paths.split(",");

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
