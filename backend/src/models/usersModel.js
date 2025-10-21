import pool from "../../db/config.js"

export const createUserModel = async (email, hashedPassword, nombre, admin = false) => {
  const SQLquery = {
    text: `INSERT INTO users (email, password, username, admin)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
    values: [email, hashedPassword, nombre, admin]
  }
  const { rows } = await pool.query(SQLquery)
  const user = rows[0]
  if (user) {
    delete user.password
  }
  return user
}

export const findUserByEmailModel = async (email) => {
  const SQLquery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }
  const { rows } = await pool.query(SQLquery)
  const user = rows[0]
  if (!user) return null
  if (user.favorites && typeof user.favorites === "string") {
    try { user.favorites = JSON.parse(user.favorites) } catch {}
  }
  return user
}

export const updateFavoritesModel = async (id, favorites) => {
  const favJson = JSON.stringify(favorites)
  const SQLquery = {
    text: 'UPDATE users SET favorites = $1::jsonb WHERE id = $2 RETURNING *',
    values: [favJson, id]
  }
  const { rows } = await pool.query(SQLquery)
  const user = rows[0]
  if (!user) return null
  if (user.favorites && typeof user.favorites === "string") {
    try { user.favorites = JSON.parse(user.favorites) } catch {}
  }
  delete user.password
  return user
}