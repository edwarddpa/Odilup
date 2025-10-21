import "dotenv/config"
import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token proporcionado" })
  }
  const token = authHeader.split(" ")[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // payload debe ser { id, email, iat, exp }
    req.user = payload
    return next()
  } catch (err) {
    console.error("Auth middleware error:", err.message)
    return res.status(401).json({ message: "Token inválido" })
  }
}
