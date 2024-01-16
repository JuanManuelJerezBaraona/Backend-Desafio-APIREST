import { Router } from "express";
import { joyasController } from "../src/controllers/joyas.controller.js";

const router = Router();

// GET /joyas
router.get("/", joyasController.read);

export default router;
