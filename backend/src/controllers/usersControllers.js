import { createUserModel, findUserByEmailModel, updateFavoritesModel } from "../models/usersModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

export const registerUser = async (req, res) => {
    try {
        const { email, password, nombre, admin } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await createUserModel(email, hashedPassword, nombre, admin)
        res.status(201).json({
            message: "Usuario registrado exitosamente", 
            user: newUser
        })
    } catch (error) {
            console.error("Error registering user:", error)
            res.status(500).json({ 
                message: "Error al registrar el usuario", 
                error: error.message 
            })
    }
}   

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findUserByEmailModel(email)
        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales inválidas" })
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.json({ token })
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const email = req.user
        console.log("Buscar usuario con email:", email)
        const user = await findUserByEmailModel(email)
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        delete user.password
        res.json( user )
          
    } catch (error) {
            res.status(500).json({
                message: "Error al obtener el usuario",
                error: error.message
            })
        }
}

export const updateFavorites = async (req, res) => {
  try {
    console.log('PUT /api/users/favorites/:id - params:', req.params, 'body:', req.body, 'user from middleware:', req.user)

    const { id } = req.params
    const { favorites } = req.body

    if (!id) return res.status(400).json({ message: 'Missing user id in params' })
    if (!favorites) return res.status(400).json({ message: 'Missing favorites in body' })
    if (!Array.isArray(favorites)) return res.status(400).json({ message: 'favorites must be an array' })

    // opcional: validar que req.user corresponde al id (si auth middleware devuelve id)
    if (req.user && typeof req.user === 'object' && req.user.id && req.user.id.toString() !== id.toString()) {
      return res.status(403).json({ message: 'No autorizado para modificar estos favoritos' })
    }

    const updatedUser = await updateFavoritesModel(id, favorites)
    if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' })

    res.json({
      message: "Favoritos actualizados exitosamente",
      user: updatedUser
    })
  } catch (error) {
    console.error("Error updating favorites:", error.stack || error)
    res.status(500).json({
      message: "Error al actualizar los favoritos",
      error: error.message
    })
  }
}

export const me = async (req, res) => {
  try {
    // si tu authMiddleware guarda el email en req.user (string)
    const email = typeof req.user === 'string' ? req.user : req.user?.email
    if (!email) return res.status(400).json({ error: "No user in token" })
    const user = await findUserByEmailModel(email)
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" })
    delete user.password
    return res.json(user)
  } catch (error) {
    console.error("Error en /me:", error)
    return res.status(500).json({ error: "Server error" })
  }
};



