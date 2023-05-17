import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import {} from "../utils/transactionHelpers";
import { getTransactionInfo } from "../utils/transactionHelpers";
import { reservationCompleteRequest } from "../utils/validationSchemas";

const transactionRoutes = express.Router();

transactionRoutes.get(
  "/:reservationId",
  verifyToken,
  async (req: Request, res: Response) => {
    const publicAddress = req.body.publicAddress;
    const reservationId = req.params.reservationId;
    const user = await checkIfUserExist(publicAddress);
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });
    const transaction = await getTransactionInfo(user.id, reservationId);
    if (!transaction)
      return res.status(404).json({
        message: "Transaction not found",
      });
    return res.status(200).json({
      message: "Transaction found",
      transaction: transaction,
    });
  }
);

export default transactionRoutes;
