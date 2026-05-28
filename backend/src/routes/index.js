//this file store all the routes
import express from "express";
import registerRoutes from "./register.routes.js";
import authRoutes from "./auth.routes.js"

const router = express.Router();

router.use("/" ,registerRoutes);
router.use("/", authRoutes);

export default router
