import { Router } from "express"

const router = Router()

import {
    getAllBooks,
    getBookById
}  from "../src/controllers/booksController.js"

router.get("/books", getAllBooks)
router.get("/books/:id", getBookById)

export default router