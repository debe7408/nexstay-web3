import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";
import imageRoutes from "./api/imageRoutes";
import reservationRoutes from "./api/reservationRoutes";
import transactionRoutes from "./api/transactionRoutes";
import reviewRoutes from "./api/reviewRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/images", imageRoutes);
router.use("/reservations", reservationRoutes);
router.use("/transactions", transactionRoutes);
router.use("/reviews", reviewRoutes);

export default router;
