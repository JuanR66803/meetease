/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg"; // Importa 'pg' para conectar con PostgreSQL
const { Pool } = pkg;

import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

// Configurar conexión a la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

// Verificar conexión a la base de datos
pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL"))
    .catch((err) => console.error("❌ Error conectando a PostgreSQL:", err));

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta de prueba para verificar el backend
app.get("/", (req, res) => {
    res.json({ message: "MeetEase Backend funcionando correctamente 🚀" });
});

// Rutas de la API
app.use("/api", authRoutes);

// Iniciar servidor
if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
        console.log(`🚀 Servidor corriendo en ${baseUrl}`);
    });
}

export default app;
// Exportar app para pruebas