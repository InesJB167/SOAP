import express from "express";
import { autenticarUser } from "../middlewares/auth.middleware.js";
import { perfil_estudante } from "../controllers/perfilEstudante.controller.js";
const router = express.Router();

router.post("/perfil-estudante", autenticarUser,perfil_estudante);
export default router;