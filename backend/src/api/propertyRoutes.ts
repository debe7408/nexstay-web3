import express, { Request, Response } from "express";
import {
  addPropertyValidation,
  reserveValidationRequest,
} from "../utils/validationSchemas";
import { queryDb } from "../databaseConnection";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import {
  checkIfPropertyExists,
  checkIfPropertyBookmarked,
  getBookmaredProperties,
  getAllProperties,
  getPropertyByID,
  removeProperty,
} from "../utils/propertyHelpers";
import {
  reserveProperty,
  getPropertyAvailability,
  getUnavailableDates,
} from "../utils/reservationHelpers";

const propertyRoutes = express.Router();

propertyRoutes.get("/", async (req, res) => {
  const properties = await getAllProperties();
  return res.status(200).json({
    message: "Returned all properties",
    properties,
  });
});

propertyRoutes.get("/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;

  const property = await getPropertyByID(propertyId);

  if (!property) {
    return res.status(404).json({
      message: "Property not found",
    });
  }

  return res.status(200).send({
    message: "Property found",
    property,
  });
});

propertyRoutes.post(
  "/",
  addPropertyValidation,
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.body.id;
    const publicAddress = req.body.publicAddress;

    const user = await checkIfUserExist(publicAddress);
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const {
      name,
      type,
      description,
      location,
      price,
      amenities,
      safety_amenities,
      size,
      booking_status,
    } = req.body;

    const { country, city, address } = location;
    const { beds, bathrooms, guests } = size;

    const sqlQuery = `INSERT INTO properties (owner_id, name, description, type, country, city, address, price, amenities, safety_amenities, beds, guests, bathrooms, booking_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const { insertId } = await queryDb(sqlQuery, [
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
      booking_status,
    ]).catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Internal server error. Please try again later.",
      });
    });

    return res.status(200).send({
      message: "Property added",
    });
  }
);

propertyRoutes.delete("/:propertyId", verifyToken, async (req, res) => {
  const propertyId = req.params.propertyId;
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress);

  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const response = await removeProperty(propertyId, userId);

  if (!response)
    return res.status(400).send({
      message: "Property not found",
    });

  return res.status(200).send({
    message: "Property removed",
  });
});

propertyRoutes.post("/bookmark/:propertyId", verifyToken, async (req, res) => {
  const propertyId = req.params.propertyId;
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;

  const user = await checkIfUserExist(publicAddress);
  if (!user) return res.status(404).json("User not found");

  const exists = await checkIfPropertyExists(propertyId);
  if (!exists) return res.status(404).json("Property not found");

  const bookmarked = await checkIfPropertyBookmarked(userId, propertyId);
  if (bookmarked) return res.status(400).json("Property already bookmarked");

  const sqlQuery = `INSERT INTO saved_properties (user_id, property_id) VALUES (?, ?)`;

  await queryDb(sqlQuery, [userId, propertyId])
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Internal server error");
    })
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.status(400).json("Property not found");
      }
      return res.status(200).json("Property bookmarked");
    });
});

propertyRoutes.delete(
  "/bookmark/:propertyId",
  verifyToken,
  async (req, res) => {
    const propertyId = req.params.propertyId;
    const userId = req.body.id;
    const publicAddress = req.body.publicAddress;

    const user = await checkIfUserExist(publicAddress);
    if (!user) return res.status(404).json("User not found");

    const exists = await checkIfPropertyExists(propertyId);
    if (!exists) return res.status(404).json("Property not found");

    const bookmarked = await checkIfPropertyBookmarked(userId, propertyId);
    if (!bookmarked) return res.status(400).json("Property not bookmarked");

    const sqlQuery = `DELETE FROM saved_properties WHERE user_id = ? AND property_id = ?`;

    await queryDb(sqlQuery, [userId, propertyId])
      .catch((err) => {
        console.log(err);
        return res.status(500).json("Internal server error");
      })
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.status(400).json("Property not found");
        }
        return res.status(200).json("Property unsaved");
      });
  }
);

propertyRoutes.get("/bookmark/all/", verifyToken, async (req, res) => {
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;

  const user = await checkIfUserExist(publicAddress);
  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const response = await getBookmaredProperties(userId);
  return res.status(200).json({
    message: "Bookmarked properties retrieved.",
    properties: response,
  });
});

propertyRoutes.get("/bookmark/:propertyId", verifyToken, async (req, res) => {
  const propertyId = req.params.propertyId;
  const userId = req.body.id;
  const publicAddress = req.body.publicAddress;

  const user = await checkIfUserExist(publicAddress);
  if (!user) return res.status(404).json("User not found");

  const response = await checkIfPropertyBookmarked(userId, propertyId);
  return res.status(200).json(Boolean(response));
});

// TODO: Remove this if not need in the future
propertyRoutes.get(
  "/reserve/:propertyId",
  reserveValidationRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyId = req.params.propertyId;
    const { checkIn, checkOut } = req.body;

    const response = await getPropertyAvailability(
      propertyId,
      checkIn,
      checkOut
    );
    return res.status(200).json(response);
  }
);

propertyRoutes.get(
  "/availability/:propertyId",
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;

    const unavailableDates = await getUnavailableDates(propertyId);

    return res.status(200).json(unavailableDates);
  }
);

propertyRoutes.post(
  "/reserve/:propertyId",
  reserveValidationRequest,
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyId = req.params.propertyId;
    const { checkIn, checkOut, publicAddress } = req.body;
    const userId = req.body.id;

    const user = await checkIfUserExist(publicAddress);
    if (!user) return res.status(404).json("User not found");

    const property = await checkIfPropertyExists(propertyId);
    if (!property) return res.status(404).json("Property not found");

    const availability = await getPropertyAvailability(
      propertyId,
      checkIn,
      checkOut
    );

    if (!availability)
      return res.status(400).json("Property not available during these dates");

    const reservationId = await reserveProperty(
      propertyId,
      userId,
      checkIn,
      checkOut
    );
    if (!reservationId) return res.status(500).json("Internal server error");

    return res.status(200).json({
      message: "Property reserved. Payment pending...",
      reservation_id: reservationId,
    });
  }
);

export default propertyRoutes;
