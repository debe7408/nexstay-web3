import express, { Request, Response } from "express";
import { addPropertyValidation } from "../utils/validationSchemas";
import { queryDb } from "../databaseConnection";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";

const propertyRoutes = express.Router();

propertyRoutes.get("/getProperties", async (req, res) => {
  const response = await queryDb("SELECT * FROM properties");
  return res.status(200).json(response);
});

propertyRoutes.get("/getProperties/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;

  const response = await queryDb("SELECT * FROM properties WHERE id = ?", [
    propertyId,
  ]);

  if (response.length === 0) {
    return res.status(404).json("Property not found");
  }

  const amenities = JSON.parse(response[0].amenities);
  const safetyAmenities = JSON.parse(response[0].safety_amenities);

  response[0].amenities = amenities;
  response[0].safety_amenities = safetyAmenities;

  return res.status(200).json(response[0]);
});

propertyRoutes.get("/getPropertiesByOwner", verifyToken, async (req, res) => {
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress);

  if (!user) return res.status(404).json("User not found");

  const response = await queryDb(
    "SELECT * FROM properties WHERE owner_id = ?",
    [userId]
  );

  return res.status(200).json(response);
});

propertyRoutes.post(
  "/addProperty",
  addPropertyValidation,
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      type,
      description,
      location,
      price,
      amenities,
      safety_amenities,
      pictures,
      size,
      booking_status,
    } = req.body;

    const { country, city, address } = location;
    const { beds, bathrooms, guests } = size;

    const userId = req.body.id;
    const publicAddress = req.body.publicAddress;

    const user = await checkIfUserExist(publicAddress);
    if (!user) return res.status(404).json("User not found");

    const sqlQuery = `INSERT INTO properties (owner_id, name, description, type, country, city, address, price, amenities, safety_amenities, beds, guests, bathrooms, pictures, booking_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await queryDb(sqlQuery, [
      userId,
      name,
      description,
      type,
      country,
      city,
      address,
      price,
      JSON.stringify(amenities),
      JSON.stringify(safety_amenities),
      beds,
      guests,
      bathrooms,
      JSON.stringify(pictures),
      booking_status,
    ]).catch((err) => {
      console.log(err);
      return res.status(500).json("Internal server error");
    });

    return res.status(200).json("Property added");
  }
);

propertyRoutes.delete("/deleteProperty", verifyToken, async (req, res) => {
  const { property_id } = req.body;
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress);

  if (!user) return res.status(404).json("User not found");
  if (!property_id) return res.status(400).json("Missing property id");

  const sqlQuery = `DELETE FROM properties WHERE id = ? AND owner_id = ?`;

  await queryDb(sqlQuery, [property_id, userId])
    .catch((err) => {
      return res.status(500).json("Internal server error");
    })
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(400).json("Property not found");
      }
      return res.status(200).json("Property deleted");
    });
});

export default propertyRoutes;
