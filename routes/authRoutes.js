import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);

// Ruta de prueba
router.get("/test", (req, res) => {
    res.json({ message: "El servidor está funcionando correctamente 🚀" });
});

export default router;
