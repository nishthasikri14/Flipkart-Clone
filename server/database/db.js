import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const Connection = async () => {
  try {
    const client = await pool.connect();
    console.log("PostgreSQL Database Connected Successfully");
    client.release();
  } catch (error) {
    console.log("Database Connection Error:", error.message);
  }
};

export { pool };
export default Connection;