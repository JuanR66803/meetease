/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg"; // Importa 'pg' para conectar con PostgreSQL
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const { Pool } = pkg;
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Servidor corriendo en puerto ${PORT}));

// 🔹 **Configuración de la base de datos**
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// 🔹 **Verificar conexión a la base de datos**
pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch((err) => console.error("❌ Error conectando a PostgreSQL:", err));

// 🔹 **Middlewares**
app.use(express.json()); // 💡 Necesario para que req.body no aparezca como 'any'

// 🔹 **Configuración de CORS** (💡 Soluciona el problema de preflight request)
app.use(cors({
    origin: "*", // Permitir Vercel
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    credentials: true, // Permitir cookies/sesiones
}));

// 🔹 **Definir rutas**
app.use("/api", authRoutes);

// 🔹 **Ruta de prueba**
app.get("/", (req, res) => {
    res.json({ message: "MeetEase Backend funcionando correctamente 🚀" });
});

// 🔹 **Iniciar servidor**
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en ${baseUrl}`);
    });
}

export default app;
