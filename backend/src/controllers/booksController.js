import { getBooksModel, getBookByIdModel } from "../models/booksModel.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await getBooksModel()
        res.json(books)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los libros",
            error: error.message
        })
    }
}

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await getBookByIdModel(id)
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" })
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el libro",
            error: error.message
        })
    }
}
