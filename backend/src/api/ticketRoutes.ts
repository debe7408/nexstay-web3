import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import { ticketPostValidationRequest } from "../utils/validationSchemas";
import { checkIfPropertyExists } from "../utils/propertyHelpers";
import {
  checkIfTicketPending,
  createTicket,
  getTicketById,
  getTicketsByPropertyId,
} from "../utils/ticketHelpers";

const ticketRoutes = express.Router();

/**
 * Creates a ticket about a property
 */
ticketRoutes.post(
  "/:propertyId",
  verifyToken,
  ticketPostValidationRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }

    const { message } = req.body;
    const publicAddress = req.body.publicAddress;
    const userId = req.body.id;
    const propertyId = req.params.propertyId;
    const user = await checkIfUserExist(publicAddress);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const response = await checkIfPropertyExists(propertyId);
    if (!response)
      return res.status(404).json({
        message: "Property not found.",
      });

    const pendingTicker = await checkIfTicketPending(userId, propertyId);
    if (pendingTicker)
      return res.status(400).json({
        message: "Ticket already pending. Please wait for a response.",
      });

    const ticket = await createTicket(propertyId, userId, message);
    if (!ticket)
      return res.status(500).json({
        message: "Ticket could not be created.",
      });
    return res.status(200).json({
      message: "Ticket submitted successfully",
    });
  }
);

/**
 * Gets all tickets for a property
 */
ticketRoutes.get(
  "/property/:propertyId",
  verifyToken,
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const response = await checkIfPropertyExists(propertyId);
    if (!response)
      return res.status(404).json({
        message: "Property not found.",
      });
    const tickets = await getTicketsByPropertyId(propertyId);
    if (!tickets)
      return res.status(404).json({
        message: "No tickets found for this property.",
      });
    return res.status(200).json({
      message: "Tickets found successfully",
      tickets: tickets,
    });
  }
);

/**
 * Gets specific ticket by id
 */
ticketRoutes.get(
  "/:ticketId",
  verifyToken,
  async (req: Request, res: Response) => {
    const ticketId = req.params.ticketId;

    const ticket = await getTicketById(ticketId);
    if (!ticket)
      return res.status(404).json({
        message: "Ticket does not exist.",
      });
    return res.status(200).json({
      message: "Ticket found.",
      ticket: ticket,
    });
  }
);

export default ticketRoutes;
