import { Router } from "express";
import { joyasController } from "../src/controllers/joyas.controller.js";

const router = Router();

// GET /joyas
router.get("/", joyasController.read);

// GET /joyas/filtros
router.get("/filtros", joyasController.readFiltered);

export default router;