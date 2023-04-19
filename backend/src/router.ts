import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";

const router = express.Router();

router.use("/usersRoute", userRoutes);
router.use("/properties", propertyRoutes);

export default router;
