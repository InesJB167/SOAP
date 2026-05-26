import express from "express" ;
import { registarUser } from "../controllers/register.controller.js";

const router = express.Router();

router.post("/user/register" ,registarUser);

export default router
