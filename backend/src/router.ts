import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";
import imageRoutes from "./api/imageRoutes";

const router = express.Router();

router.use("/usersRoute", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/images", imageRoutes);

export default router;
