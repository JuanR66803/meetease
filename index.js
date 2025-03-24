/* eslint-disable no-undef */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", authRoutes);

if (process.env.NODE_ENV !== "test") {
    app.listen(port, () => {
    console.log(`Servidor corriendo en ${process.env.BASE_URL || "http://localhost:" + port}`);
    });
}

export default app;
