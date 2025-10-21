import pool from "../../db/config.js"

// post
export const createTattooModel = async (name, description, design_url, categories = [], price = null, from_admin = false, user_id = null) => {
    const SQLquery = {
        text: `INSERT INTO tattoos (name, description, design_url, categories, price, from_admin, user_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values: [name, description, design_url, categories, price, from_admin, user_id]
    }
    const results = await pool.query(SQLquery)
    return results.rows[0]
}

export const getPendingTattoosModel = async () => {
  const SQLquery = {
    text: `SELECT * FROM tattoos WHERE approved = false ORDER BY created_at DESC`
  }
  const { rows } = await pool.query(SQLquery)
  return rows
}

export const approveTattooModel = async (id, approve = true, price = null) => {
  const SQLquery = {
    text: `UPDATE tattoos SET approved = $1, from_admin = $2, price = $3 WHERE id = $4 RETURNING *`,
    values: [approve, true, price, id]
  }
  const { rows } = await pool.query(SQLquery)
  return rows[0] || null
}

// get
export const getTattoosModel = async () => {
    const SQLquery = "SELECT * FROM tattoos ORDER BY created_at DESC"
    const results = await pool.query(SQLquery)
    return results.rows
}

export const getTattoosByUserModel = async (userId) => {
  const SQLquery = { text: `SELECT * FROM tattoos WHERE user_id = $1 ORDER BY created_at DESC`, values: [userId] }
  const { rows } = await pool.query(SQLquery)
  return rows
}

export const getTattooByIdModel = async (id) => {
  const SQLquery = { text: `SELECT * FROM tattoos WHERE id = $1`, values: [id] }
  const { rows } = await pool.query(SQLquery)
  return rows[0] || null
}

// delete
export const deleteTattooModel = async (id) => {
    const SQLquery = {
        text: 'DELETE FROM tattoos WHERE id = $1 RETURNING *',
        values: [id]
    }
    const results = await pool.query(SQLquery)
    console.log(results.rows)
    return results.rows[0]
}