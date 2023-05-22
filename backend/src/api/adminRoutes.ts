import express, { Request, Response } from "express";
import { verifyToken, verifyType } from "../utils/tokenHelpers";
import { getAllUsers } from "../utils/userHelpers";
import {} from "../utils/transactionHelpers";
import { getAllTickets } from "../utils/ticketHelpers";
import { getAllReservations } from "../utils/reservationHelpers";
import { getAllPropertiesWithOwner } from "../utils/propertyHelpers";

const adminRoutes = express.Router();

adminRoutes.get(
  "/users",
  verifyToken,
  verifyType,
  async (req: Request, res: Response) => {
    const users = await getAllUsers();

    if (!users) {
      return res.status(404).send({
        message: "No users found!",
      });
    }

    return res.status(200).send({
      message: "Retrieved all users.",
      users,
    });
  }
);

adminRoutes.get(
  "/tickets",
  verifyToken,
  verifyType,
  async (req: Request, res: Response) => {
    const tickets = await getAllTickets();

    if (!tickets) {
      return res.status(404).send({
        message: "No tickets found!",
      });
    }

    return res.status(200).send({
      message: "Retrieved all tickets.",
      tickets,
    });
  }
);

adminRoutes.get(
  "/reservations",
  verifyToken,
  verifyType,
  async (req: Request, res: Response) => {
    const reservations = await getAllReservations();

    if (!reservations) {
      return res.status(404).send({
        message: "No reservations found!",
      });
    }

    return res.status(200).send({
      message: "Retrieved all reservations.",
      reservations,
    });
  }
);

adminRoutes.get(
  "/properties",
  verifyToken,
  verifyType,
  async (req: Request, res: Response) => {
    const properties = await getAllPropertiesWithOwner();

    if (!properties) {
      return res.status(404).send({
        message: "No properties found!",
      });
    }

    return res.status(200).send({
      message: "Retrieved all properties.",
      properties,
    });
  }
);

export default adminRoutes;
