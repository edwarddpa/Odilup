import { Router } from "express";
import { tattooController } from "../controllers/tattoo.controller.js";

const router = Router();

router.get("/", tattooController.readTattoos);
router.get("/:id", tattooController.readTattoo);

export default router;
