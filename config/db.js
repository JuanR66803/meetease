import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    dbName: "meeteasedb" // Reemplaza con el nombre real de tu base de datos
})
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => {
        console.error("❌ Error conectando a MongoDB:", err.message);
        process.exit(1);
    });

export default mongoose;