/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg"; // Importa 'pg' para conectar con PostgreSQL
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const { Pool } = pkg;
const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// 🔹 **Configuración de la base de datos**
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// 🔹 **Verificar conexión a la base de datos**
pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch((err) => console.error("❌ Error conectando a PostgreSQL:", err));

// 🔹 **Middlewares**
app.use(express.json()); // 💡 Necesario para que req.body no aparezca como 'any'
app.use(cors());

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

// Exportar app para pruebas