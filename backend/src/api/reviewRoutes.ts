import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { verifyToken } from "../utils/tokenHelpers";
import { checkIfUserExist } from "../utils/userHelpers";
import { reviewPostValidationRequest } from "../utils/validationSchemas";
import { getReservationInfo } from "../utils/reservationHelpers";
import {
  createReview,
  getReviewInfoByReservationId,
} from "../utils/reviewHelpers";
import {
  getReviewInfoByPropertyId,
  getReviewInfoByUserId,
  getReviewInfo,
} from "../utils/reviewHelpers";

const reviewRoutes = express.Router();

/**
 * Creates a review about a property
 */
reviewRoutes.post(
  "/:reservationId",
  verifyToken,
  reviewPostValidationRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }

    const { rating, comment } = req.body;
    const publicAddress = req.body.publicAddress;
    const userId = req.body.id;
    const reservationId = req.params.reservationId;
    const user = await checkIfUserExist(publicAddress);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const reservation = await getReservationInfo(reservationId);
    if (!reservation)
      return res.status(404).json({
        message: "Reservation not found",
      });

    if (reservation.user_id !== userId)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const { id: reservation_id, property_id } = reservation;

    const review = await createReview(
      property_id,
      userId,
      reservation_id,
      rating,
      comment
    );
    if (!review)
      return res.status(500).json({
        message: "Could not create a review",
      });
    return res.status(200).json({
      message: "Review created successfully",
    });
  }
);

/**
 * Get all reviews about a property
 */
reviewRoutes.get(
  "/property/:propertyId",
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const reviews = await getReviewInfoByPropertyId(propertyId);
    if (!reviews)
      return res.status(404).json({
        message: "Reviews were not found.",
      });
    return res.status(200).json({
      message: "Reviews about property fetched successfully",
      reviews,
    });
  }
);

/**
 * Get specific review by review id
 */
reviewRoutes.get("/:reviewId", async (req: Request, res: Response) => {
  const reviewId = req.params.reviewId;
  const review = await getReviewInfo(reviewId);
  if (!review)
    return res.status(404).json({
      message: "Review was not found.",
    });
  return res.status(200).json({
    message: "Review fetched successfully",
    review,
  });
});

/**
 * Get all reviews by a user
 */
reviewRoutes.get("/user/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const reviews = await getReviewInfoByUserId(userId);
  if (!reviews)
    return res.status(404).json({
      message: "User does not have any reviews.",
    });
  return res.status(200).json({
    message: "User reviews fetched successfully",
    reviews,
  });
});

/**
 * Get specific review by reservation id
 */
reviewRoutes.get(
  "/reservation/:reservationId",
  async (req: Request, res: Response) => {
    const reservationId = req.params.reservationId;
    const review = await getReviewInfoByReservationId(reservationId);
    if (!review)
      return res.status(404).json({
        message: "Review was not found.",
      });
    return res.status(200).json({
      message: "Existing review found.",
      review,
    });
  }
);

export default reviewRoutes;
