import pool from "../../db/config.js"

//get
export const getBooksModel = async () => {
    const SQLquery = "SELECT * FROM books"
    const results = await pool.query(SQLquery)
    console.log(results.rows)
    return results.rows
}

//get by id
export const getBookByIdModel = async (id) => {
    const SQLquery = {
        text: 'SELECT * FROM books WHERE id = $1',
        values: [id]
    }
    const results = await pool.query(SQLquery)
    return results.rows[0]
}