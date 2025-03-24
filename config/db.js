/* eslint-disable no-undef */
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Necesario para conexiones a servicios como Supabase o Neon
    },
});

export default db;
