import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";
import imageRoutes from "./api/imageRoutes";
import reservationRoutes from "./api/reservationRoutes";
import transactionRoutes from "./api/transactionRoutes";
import reviewRoutes from "./api/reviewRoutes";
import ticketRoutes from "./api/ticketRoutes";
import adminRoutes from "./api/adminRoutes";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/images", imageRoutes);
router.use("/reservations", reservationRoutes);
router.use("/transactions", transactionRoutes);
router.use("/reviews", reviewRoutes);
router.use("/tickets", ticketRoutes);
router.use("/admins", adminRoutes);

export default router;
