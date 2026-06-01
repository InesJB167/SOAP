import express from "express";
import { autenticarUser } from "../middlewares/auth.middleware.js";
import { buscar_perfil, perfil_estudante } from "../controllers/perfilEstudante.controller.js";
const router = express.Router();

router.post("/perfil-estudante", autenticarUser,perfil_estudante);

router.get("/perfil-estudante", autenticarUser,buscar_perfil);

export default router;


