//this file store all the routes
import express from "express";
import registerRoutes from "./register.routes.js";

const router = express.Router();

router.use("/" ,registerRoutes)

export default router
