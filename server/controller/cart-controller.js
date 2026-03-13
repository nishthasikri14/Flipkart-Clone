import { pool } from "../database/db.js";

export const addItemInCart = async (request, response) => {
    try {

        const { user_id, product_id, quantity } = request.body;

        const result = await pool.query(
            "INSERT INTO cart (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *",
            [user_id, product_id, quantity]
        );

        response.status(200).json(result.rows[0]);

    } catch (error) {
        console.log(error);
        response.status(500).json("Error adding item to cart");
    }
}