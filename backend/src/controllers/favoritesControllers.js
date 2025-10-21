import { addFavoriteModel, removeFavoriteModel, getFavoritesByUserModel } from "../models/favoritesModel.js"

export const addFavorite = async (req, res) => {
  try {
    console.log("addFavorite - req.user:", req.user, "body:", req.body)
    const userId = req.user?.id || null
    const { tattooId } = req.body
    if (!userId) return res.status(401).json({ message: "No autorizado" })
    if (!tattooId) return res.status(400).json({ message: "tattooId requerido" })

    // opcional: validar que usuario y tattoo existen
    // const user = await findUserByIdModel(userId); if (!user) return res.status(404)...

    await addFavoriteModel(userId, tattooId)
    const favorites = await getFavoritesByUserModel(userId)
    return res.status(201).json({ message: "Favorito añadido", favorites })
  } catch (error) {
    console.error("Error addFavorite:", error.stack || error)
    return res.status(500).json({ message: "Error interno", error: error.message })
  }
}

export const removeFavorite = async (req, res) => {
  try {
    console.log("removeFavorite - req.user:", req.user, "params:", req.params)
    const userId = req.user?.id || null
    const { tattooId } = req.params
    if (!userId) return res.status(401).json({ message: "No autorizado" })
    if (!tattooId) return res.status(400).json({ message: "tattooId requerido" })

    await removeFavoriteModel(userId, tattooId)
    const favorites = await getFavoritesByUserModel(userId)
    return res.json({ message: "Favorito eliminado", favorites })
  } catch (error) {
    console.error("Error removeFavorite:", error.stack || error)
    return res.status(500).json({ message: "Error interno", error: error.message })
  }
}

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id || null
    if (!userId) return res.status(401).json({ message: "No autorizado" })
    const favorites = await getFavoritesByUserModel(userId)
    return res.json({ favorites })
  } catch (error) {
    console.error("Error getFavorites:", error.stack || error)
    return res.status(500).json({ message: "Error interno", error: error.message })
  }
}