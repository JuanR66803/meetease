import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Configuración de la base de datos
if (!process.env.MONGO_URI) {
    console.error("❌ ERROR: La variable de entorno MONGO_URI no está definida.");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => {
        console.error("❌ Error conectando a MongoDB:", err);
        process.exit(1);
    });

// 🔹 Middlewares
app.use(express.json()); 

// 🔹 Configuración de CORS
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// 🔹 Definir rutas
app.use("/api", authRoutes);

// 🔹 Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "MeetEase Backend funcionando correctamente 🚀" });
});

// 🔹 Iniciar servidor
if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
}

export default app;