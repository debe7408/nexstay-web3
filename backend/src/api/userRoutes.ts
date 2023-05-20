import express, { Request, Response } from "express";
import { queryDb } from "../databaseConnection";
import {
  usersPostValidation,
  userUpdateContactInfo,
} from "../utils/validationSchemas";
import { validationResult } from "express-validator";
import { signToken, verifyToken } from "../utils/tokenHelpers";
import {
  checkIfUserExist,
  checkIfUserHasProperties,
  createUser,
  getUserInfo,
  updateUserInfo,
} from "../utils/userHelpers";
import { getUserReservations } from "../utils/reservationHelpers";
import { getUsersProperties } from "../utils/propertyHelpers";

const userRoutes = express.Router();

userRoutes.get("/all", async (req, res) => {
  const response = await queryDb("SELECT * FROM users");
  return res.json(response);
});

/**
 * Endpoint for updating user contact info.
 */
userRoutes.post(
  "/updateContactInfo",
  userUpdateContactInfo,
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { publicAddress, firstName, lastName, email, age } = req.body;
    const publicAddressLowercased = publicAddress.toLowerCase();

    try {
      const user = await checkIfUserExist(publicAddressLowercased);

      if (!user) return res.status(404).send("User not found");

      const updated = await updateUserInfo(
        publicAddressLowercased,
        firstName,
        lastName,
        email,
        age
      );

      if (!updated)
        return res.status(500).send({ message: "Could not update user." });

      return res.send({ message: "User updated" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

/**
 * Endpoint for creating a new user or logging in an existing user.
 */
userRoutes.post(
  "/",
  usersPostValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { publicAddress } = req.body;
    const publicAddressLowercased = publicAddress.toLowerCase();

    try {
      const user = await checkIfUserExist(publicAddressLowercased);

      if (!user) {
        const insertId = await createUser(publicAddressLowercased);

        const newUser = await getUserInfo(insertId);

        if (!newUser) return res.status(404).send("User not found");

        const token = signToken(
          publicAddressLowercased,
          insertId,
          newUser.type
        );
        return res.send({
          message: "Welcome! You are now logged in.",
          token,
          user: newUser,
        });
      }

      const token = signToken(publicAddressLowercased, user.id, user.type);

      return res.status(200).send({
        message: "Welcome Back! You are now logged in.",
        token,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

/**
 * Endpoint for getting single user info.
 */
userRoutes.get("/", verifyToken, async (req, res) => {
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress.toLowerCase());

  if (!user) return res.status(404).send("User not found");

  const properties = await checkIfUserHasProperties(user.id);

  if (properties) {
    user.ownedProperties = properties;
  }

  return res.send(user);
});

/**
 * Endpoint for getting user reservations.
 */
userRoutes.get("/reservations", verifyToken, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress.toLowerCase());

  if (!user) return res.status(404).send("User not found");

  const reservations = await getUserReservations(user.id);

  return res.send(reservations);
});

/**
 * Endpoint for getting user properties.
 */
userRoutes.get("/properties", verifyToken, async (req, res) => {
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress.toLowerCase());

  if (!user)
    return res.status(404).send({
      message: "User not found",
    });

  const properties = await getUsersProperties(user.id);

  return res.send({
    message: "User properties",
    properties,
  });
});

export default userRoutes;
