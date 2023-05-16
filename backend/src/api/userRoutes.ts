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

const userRoutes = express.Router();

userRoutes.get("/allUsers", async (req, res) => {
  const response = await queryDb("SELECT * FROM users");
  return res.json(response);
});

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

userRoutes.post(
  "/users",
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

userRoutes.get("/users", verifyToken, async (req, res) => {
  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress.toLowerCase());

  if (!user) return res.status(404).send("User not found");

  const properties = await checkIfUserHasProperties(user.id);

  if (properties) {
    user.ownedProperties = properties;
  }

  return res.send(user);
});

userRoutes.get("/users/reservations", verifyToken, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const publicAddress = req.body.publicAddress;
  const user = await checkIfUserExist(publicAddress.toLowerCase());

  if (!user) return res.status(404).send("User not found");

  const reservations = await getUserReservations(user.id);

  return res.send(reservations);
});

export default userRoutes;
