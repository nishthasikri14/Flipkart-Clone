import { pool } from "../database/db.js";

export const getProducts = async (request, response) => {
    try {
        const result = await pool.query("SELECT * FROM products LIMIT 20");
        response.json(result.rows);
    } catch (error) {
        console.log(error);
        response.status(500).json("Error fetching products");
    }
};

export const getProductById = async (request, response) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [request.params.id]
        );
        response.json(result.rows[0]);
    } catch (error) {
        console.log(error);
        response.status(500).json("Error fetching product");
    }
};