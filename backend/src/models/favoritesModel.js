import pool from "../../db/config.js"

export const addFavoriteModel = async (userId, tattooId) => {
  const sql = `INSERT INTO favorites (user_id, tattoo_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *`
  const { rows } = await pool.query(sql, [userId, tattooId])
  return rows[0] || null
}

export const removeFavoriteModel = async (userId, tattooId) => {
  const sql = `DELETE FROM favorites WHERE user_id = $1 AND tattoo_id = $2 RETURNING *`
  const { rows } = await pool.query(sql, [userId, tattooId])
  return rows[0] || null
}

export const getFavoritesByUserModel = async (userId) => {
  const sql = `
    SELECT t.* FROM tattoos t
    JOIN favorites f ON f.tattoo_id = t.id
    WHERE f.user_id = $1
    ORDER BY f.created_at DESC
  `
  const { rows } = await pool.query(sql, [userId])
  return rows
}