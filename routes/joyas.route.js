import { Router } from "express";
import { joyasController } from "../src/controllers/joyas.controller.js";

const router = Router();

// GET /joyas
router.get("/", joyasController.read);

// GET /joyas/joya/:id
router.get("/joya/:id", joyasController.readById);

// GET /joyas/filtros
router.get("/filtros", joyasController.readFiltered);

export default router;