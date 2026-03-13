import { pool } from "../database/db.js";

export const userLogIn = async (request, response) => {
    try {

        const { email, password } = request.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email=$1 AND password=$2",
            [email, password]
        );

        const user = result.rows[0];

        if (user) {
            return response.send({ username: user.username });
        } else {
            return response.status(401).json("Invalid Login");
        }

    } catch (error) {
        response.status(500).json(error.message);
    }
};

export const userSignUp = async (request, response) => {
    try {

        const { username, firstName, lastName, email, password, phone } = request.body;

        const exist = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );

        if (exist.rows.length > 0) {
            return response.status(401).json({ message: "User already exists" });
        }

        await pool.query(
            "INSERT INTO users (username, firstname, lastname, email, password, phone) VALUES ($1,$2,$3,$4,$5,$6)",
            [username, firstName, lastName, email, password, phone]
        );

        response.status(200).json(`${firstName} has been successfully registered`);

    } catch (error) {
        response.status(500).json(error.message);
    }
};