import { Router } from "express";
import { createCheckout } from "../src/controllers/checkoutController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware);
router.post("/", createCheckout);

export default router;  