import { Router } from "express"

const router = Router()

import { authMiddleware } from "../middleware/auth.middleware.js"
import { getAllTattoos, createTattoo, deleteTattoo, getPendingTattoos, approveTattoo, notFound, getUserTattoos } from "../src/controllers/tattoosControllers.js"; 

router.get("/", getAllTattoos)
router.post("/", authMiddleware, createTattoo)
router.delete("/:id", authMiddleware, deleteTattoo)

// ADMIN: pendientes y aprobar
router.get("/pending", authMiddleware, getPendingTattoos)
router.put("/:id/approve", authMiddleware, approveTattoo)

// USER: mis tatuajes
router.get("/mine", authMiddleware, getUserTattoos)

router.use(notFound)

export default router