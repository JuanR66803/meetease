import mongoose from "mongoose";

// 🔹 Definir el esquema de usuario
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// 🔹 Crear el modelo
const User = mongoose.model("User", userSchema);

// 🔹 Función para buscar usuario por email
export const findUserByEmail = async (email) => {
    try {
        console.log("Buscando usuario en MongoDB...");
        return await User.findOne({ email }); // Devuelve el usuario o null
    } catch (error) {
        console.error("Error en findUserByEmail:", error);
        throw error;
    }
};

// 🔹 Función para crear un nuevo usuario
export const createUser = async (name, email, password) => {
    try {
        console.log("Creando nuevo usuario en MongoDB...");
        const newUser = new User({ name, email, password });
        return await newUser.save(); // Guarda y devuelve el usuario creado
    } catch (error) {
        console.error("Error en createUser:", error);
        throw error;
    }
};

export default User;