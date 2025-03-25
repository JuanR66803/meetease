import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg"; // Importa 'pg' para conectar con PostgreSQL
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const { Pool } = pkg;
const app = express();

const PORT = process.env.PORT || 3000;

// 🔹 Configuración de la base de datos
if (!process.env.DATABASE_URL) {
    console.error("❌ ERROR: La variable de entorno DATABASE_URL no está definida.");
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

// 🔹 Verificar conexión a la base de datos
pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch((err) => {
        console.error("❌ Error conectando a PostgreSQL:", err);
        process.exit(1);
    });

// 🔹 Middlewares
app.use(express.json()); // 💡 Necesario para que req.body no aparezca como 'any'

// 🔹 Configuración de CORS (💡 Soluciona problemas de preflight request)
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.setHeader("Access-Control-Allow-Credentials", "true");
    }

    // Manejo de solicitudes OPTIONS (Preflight Request)
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

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
