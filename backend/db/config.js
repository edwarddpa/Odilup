import pg from "pg"
import "dotenv/config"

process.loadEnvFile()

const { DB_CONNECTION_URL, DB_PASSWORD } = process.env
const { Pool } = pg

const pool = new Pool({
    connectionString: DB_CONNECTION_URL,
});


pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error executing query", err.stack)
    } else {
        console.log("Current time:", res.rows[0])
    }
})

export default pool