import express, { Request, Response } from "express";
import { addPropertyValidation, jwtAuthorize } from "../validation";
import { queryDb } from "../databaseConnection";
import { validationResult } from "express-validator";

const propertyRoutes = express.Router();

propertyRoutes.get("/getProperties", async (req, res) => {
  const response = await queryDb("SELECT * FROM properties");
  return res.status(200).json(response);
});

propertyRoutes.post(
  "/addProperty",
  addPropertyValidation,
  jwtAuthorize,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      property_type,
      country,
      city,
      address,
      price,
      amenities,
      pictures,
      booking_status,
    } = req.body;

    const userId = req.body.id;

    const sqlQuery = `INSERT INTO properties (owner_id, name, property_type, country, city, address, price, amenities, pictures, booking_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    await queryDb(sqlQuery, [
      userId,
      name,
      property_type,
      country,
      city,
      address,
      price,
      JSON.stringify(amenities),
      JSON.stringify(pictures),
      booking_status,
    ]).catch((err) => {
      console.log(err);
      return res.status(500).json("Internal server error");
    });

    return res.status(200).json("Property added");
  }
);

export default propertyRoutes;
