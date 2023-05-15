import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import {
  changeReservationStatus,
  checkIfReservationBelongsToUser,
  getReservationStatus,
  getReservationInfo,
  ReservationStatus,
} from "../utils/reservationHelpers";
import { storeTransaction } from "../utils/transactionHelpers";
import { reservationCompleteRequest } from "../utils/validationSchemas";

const reservationRoutes = express.Router();

/**
 * Confirm reservation after payment is received
 */
reservationRoutes.post(
  "/confirm/:reservationId",
  verifyToken,
  reservationCompleteRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const reservationId = req.params.reservationId;
    const hash = req.body.hash;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const publicAddress = req.body.publicAddress;

    const user = await checkIfUserExist(publicAddress);
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const reservation = await checkIfReservationBelongsToUser(
      reservationId,
      user.id
    );

    if (!reservation)
      return res.status(404).json({
        message: "Reservation not found",
      });

    const reservationStatus = await getReservationStatus(reservationId);

    if (reservationStatus !== ReservationStatus.PENDING)
      return res.status(400).json({
        message: "Reservation is not pending",
      });

    const saveTransaction = await storeTransaction({
      reservationId,
      userId: user.id,
      hash,
    });

    if (!saveTransaction)
      return res.status(400).json({
        message: "Transaction not saved",
      });

    const confirmed = await changeReservationStatus(
      reservationId,
      ReservationStatus.CONFIRMED
    );

    if (!confirmed)
      return res.status(400).json({
        message: "Reservation coud not be confirmed",
      });

    return res.status(200).json({
      message: "Reservation confirmed",
    });
  }
);

reservationRoutes.get(
  "/:reservationId",
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const reservationId = req.params.reservationId;
    const userId = req.body.id;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reservation = await checkIfReservationBelongsToUser(
      reservationId,
      userId
    );

    if (!reservation) return res.status(404).json("Reservation not found");

    const reservationInfo = await getReservationInfo(reservationId);

    return res.status(200).json(reservationInfo);
  }
);

export default reservationRoutes;
