import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../models/userModel.js";

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.log("❌ Faltan datos en la solicitud");
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        console.log(`🔍 Buscando usuario con email: ${email}`);
        const userExists = await findUserByEmail(email);

        if (userExists) {
            console.log("⚠️ Usuario ya registrado");
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("📝 Creando usuario en la base de datos...");
        const newUser = await createUser(name, email, hashedPassword);

        console.log("✅ Usuario registrado con éxito:", newUser);
        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
        console.error("❌ Error al registrar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};
