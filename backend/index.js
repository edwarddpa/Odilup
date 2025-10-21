import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.routes.js'
import tattooRoutes from './routes/tattoos.routes.js'
import bookRoutes from './routes/book.routes.js'
import checkoutRoute from "./routes/checkout.routes.js";
import favoriteRoutes from "./routes/favorites.routes.js";

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/tattoos', tattooRoutes)
app.use('/api/books', bookRoutes)
app.use("/api/checkouts", checkoutRoute)
app.use("/api/favorites", favoriteRoutes)
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" })
})

export default app