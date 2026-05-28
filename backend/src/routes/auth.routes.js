import express from "express";
import { login } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/user/auth", login);

export default router
