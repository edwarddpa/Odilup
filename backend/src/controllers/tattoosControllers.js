import { createTattooModel, getTattoosModel, deleteTattooModel, getPendingTattoosModel, approveTattooModel, getTattoosByUserModel, getTattooByIdModel } from "../models/tattoosModel.js";
import { prepararHATEOAS } from "../../helper/hateoas.js";
import { findUserByEmailModel } from "../models/usersModel.js";

// get
export const getAllTattoos = async (req, res) => {
    try {
        const queryStrings = req.query
        const tattoos = await getTattoosModel(queryStrings)
        const HATEOAS = await prepararHATEOAS(tattoos, queryStrings)
        res.json(HATEOAS)
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los tatuajes",
            error: error.message
        })

    }
}   

export const createTattoo = async (req, res) => {
    try {
        const { name, description, img, design_url, categories } = req.body
        const userId = req.user?.id
        const PLACEHOLDER = "https://placehold.co/400"
        const finalDesignUrl = design_url || img || PLACEHOLDER

        if (!userId) return res.status(401).json({ message: "No autorizado" })
        if (!name || !description) return res.status(400).json({ message: "Faltan campos requeridos: name o description" })

        const cats = Array.isArray(categories) ? categories : (categories ? categories.split(",").map(c => c.trim()) : [])

        // price = null (admin pondrá precio al aprobar)
        const newTattoo = await createTattooModel(name, description, finalDesignUrl, cats, null, false, userId)
        return res.status(201).json(newTattoo)
    } catch (error) {
        console.error("Error creating tattoo:", error)
        return res.status(500).json({ message: "Error creando tattoo", error: error.message })
    }
}

export const getUserTattoos = async (req, res) => {
  try {
    const userId = req.user?.id
    if (!userId) return res.status(401).json({ message: "No autorizado" })
    const rows = await getTattoosByUserModel(userId)
    return res.json({ tattoos: rows })
  } catch (err) {
    console.error("Error getUserTattoos:", err)
    return res.status(500).json({ message: "Error interno", error: err.message })
  }
}

// solo admins pueden acceder
export const getPendingTattoos = async (req, res) => {
 try {
    const email = req.user?.email
    if (!email) return res.status(401).json({ message: "No autorizado" })
    const requester = await findUserByEmailModel(email)
    if (!requester || !requester.admin) return res.status(403).json({ message: "No autorizado" })

    const pending = await getPendingTattoosModel()
    return res.json({ pending })
  } catch (error) {
    console.error("Error getPendingTattoos:", error)
    return res.status(500).json({ message: "Error interno", error: error.message })
  }
}

export const approveTattoo = async (req, res) => {
  try {
    const email = req.user?.email
    if (!email) return res.status(401).json({ message: "No autorizado" })
    const requester = await findUserByEmailModel(email)
    if (!requester || !requester.admin) return res.status(403).json({ message: "No autorizado" })

    const { id } = req.params
    if (!id) return res.status(400).json({ message: "Id requerido" })

    const { price } = req.body
    const priceNum = price === undefined || price === null ? null : Number(price)
    if (price !== undefined && price !== null && Number.isNaN(priceNum)) {
      return res.status(400).json({ message: "price debe ser numérico" })
    }

    const updated = await approveTattooModel(id, true, priceNum)
    if (!updated) return res.status(404).json({ message: "Tattoo no encontrado" })

    return res.json({ message: "Tattoo aprobado", tattoo: updated })
  } catch (error) {
    console.error("Error approveTattoo:", error)
    return res.status(500).json({ message: "Error interno", error: error.message })
  }
}

export const deleteTattoo = async (req, res) => {
    try {
        const { id } = req.params
        const requesterId = req.user?.id
        const requesterEmail = req.user?.email
        if (!requesterId) return res.status(401).json({ message: "No autorizado" })

        const requester = await findUserByEmailModel(requesterEmail)
        const tattoo = await getTattooByIdModel(id)
        if (!tattoo) return res.status(404).json({ message: "Tatuaje no encontrado" })

        // solo el autor (user_id) o admin pueden borrar
        if (tattoo.user_id !== requesterId && !requester?.admin) {
          return res.status(403).json({ message: "No autorizado para eliminar este tatuaje" })
        }

        const deletedTattoo = await deleteTattooModel(id)
        if (!deletedTattoo) {
            return res.status(404).json({ message: "Tatuaje no encontrado" })
        }
        res.json({
            message: "Tatuaje eliminado exitosamente",
            tattoo: deletedTattoo
        })
    } catch (error) {
        console.error("Error deleting tattoo:", error)
        res.status(500).json({
            message: "Error al eliminar el tatuaje",
            error: error.message
        })
    }
}

export const notFound = (req, res) => {
    res.status(404).send("Endpoint no encontrado" )
}