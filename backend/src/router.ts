import express from "express";
import userRoutes from "./api/userRoutes";
import propertyRoutes from "./api/propertyRoutes";
import testRoutes from "./api/testRoutes";

const router = express.Router();

router.use("/usersRoute", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/test", testRoutes);

export default router;
