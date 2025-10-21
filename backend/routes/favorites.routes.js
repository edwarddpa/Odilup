import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { addFavorite, removeFavorite, getFavorites } from "../src/controllers/favoritesControllers.js"

const router = Router()

router.post("/", authMiddleware, addFavorite)
router.delete("/:tattooId", authMiddleware, removeFavorite)
router.get("/", authMiddleware, getFavorites)

export default router