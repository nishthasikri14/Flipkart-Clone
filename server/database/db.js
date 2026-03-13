import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Flipkart",
    password: "5432",
    port: 5432
});

const Connection = async () => {
    try {
        const client = await pool.connect();
        console.log("PostgreSQL Database Connected Successfully");
        client.release();
    } catch (error) {
        console.log("Error:", error.message);
    }
};

export { pool };
export default Connection;