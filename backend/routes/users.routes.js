import { Router } from "express";

const router = Router()

import { authMiddleware } from "../middleware/auth.middleware.js"
import { registerUser, loginUser, getUser, me } from "../src/controllers/usersControllers.js";

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", authMiddleware, getUser)
router.get("/me", authMiddleware, me)

export default router