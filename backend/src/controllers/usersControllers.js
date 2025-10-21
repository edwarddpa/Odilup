import { createUserModel, findUserByEmailModel} from "../models/usersModel.js"
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

export const me = async (req, res) => {
  try {
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



