import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import rutinaRoutes from "./routes/rutina.routes.js";
import ejercicioRoutes from "./routes/ejercicio.routes.js";
import progresoRoutes from "./routes/progreso.routes.js";
import detallerutinaRoutes from './routes/detallerutina.routes.js';
import recomendacionRoutes from './routes/recomendacion.routes.js';
import { FRONTEND_URL } from "./config.js"; // Importa el array procesado
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // Asegúrate de cargar las variables de entorno antes de usar cualquier configuración

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: FRONTEND_URL, // Usamos el array procesado
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({
        message: "Bienvenido a la API del GymApp",
        availableRoutes: {
            auth: "/api/auth",
            rutina: "/api/rutinas",
            ejercicio: "/api/ejercicios",
            progreso: "/api/progreso",
            detallerutina: "/api/detallerutina",
            recomendacion: "/api/recomendaciones",
        },
    });
});

// Rutas de tu aplicación
app.use("/api", authRoutes);
app.use("/api", rutinaRoutes);
app.use("/api", ejercicioRoutes);
app.use("/api", progresoRoutes);
app.use("/api", detallerutinaRoutes);
app.use('/api', recomendacionRoutes);

// Configura una ruta general para servir archivos de /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
