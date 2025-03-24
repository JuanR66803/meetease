import db from "../db.js";

export const findUserByEmail = async (email) => {
    try {
        console.log("🔍 Ejecutando consulta para buscar usuario...");
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0]; // Si el usuario existe, devuelve el objeto, si no, devuelve undefined
    } catch (error) {
        console.error("❌ Error en findUserByEmail:", error);
        throw error;
    }
};

export const createUser = async (name, email, password) => {
    try {
        console.log("📝 Insertando nuevo usuario...");
        const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        return result.rows[0]; // Devuelve el usuario creado
    } catch (error) {
        console.error("❌ Error en createUser:", error);
        throw error;
    }
};
