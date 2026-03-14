import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_8FGTh3LWRXJa@ep-wandering-violet-a4g0yd8v-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
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