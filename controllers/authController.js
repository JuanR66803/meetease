import {findUserByEmail, createUser} from "../models/userModel.js";
import bcrypt from "bcryptjs";
export const registerUser = async (req, res) => {
    try {
        console.log("📌 Recibiendo solicitud de registro:", req.body);

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.warn("⚠️ Datos incompletos:", { name, email, password });
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const userExists = await findUserByEmail(email);
        console.log("🔍 Usuario encontrado:", userExists);

        if (userExists) {
            console.warn("⚠️ El usuario ya está registrado:", email);
            return res.status(400).json({ message: "El usuario ya está registrado." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔑 Contraseña hasheada correctamente");

        const newUser = await createUser(name, email, hashedPassword);
        console.log("✅ Usuario registrado con éxito:", newUser);

        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });

    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);

        res.status(500).json({ 
            message: "Error en el servidor",
            error: error.message, 
            stack: error.stack 
        });
    }
};
