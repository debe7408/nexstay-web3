import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";
import imageRoutes from "./api/imageRoutes";
import reservationRoutes from "./api/reservationRoutes";

const router = express.Router();

router.use("/usersRoute", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/images", imageRoutes);
router.use("/reservations", reservationRoutes);

export default router;
