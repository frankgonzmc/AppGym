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
import { FRONTEND_URL } from "./config.js";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.options('*', cors()); // Permite las opciones de preflight en el servidor

app.use(cors({
    origin: (origin, callback) => {
        console.log(`Request origin: ${origin}`); // Verificar qué origen se detecta
        if (!origin || FRONTEND_URL.some(url => url === origin)) {
            callback(null, true); // Permite la solicitud
        } else {
            console.error(`Blocked by CORS: ${origin}`); // Log para depuración
            callback(new Error('Not allowed by CORS')); // Bloquea la solicitud
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Necesario para cookies o headers de autenticación
    optionsSuccessStatus: 200, // Soluciona problemas con navegadores antiguos
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", rutinaRoutes);
app.use("/api", ejercicioRoutes);
app.use("/api", progresoRoutes);
app.use("/api", detallerutinaRoutes);
app.use('/api', recomendacionRoutes);

// Configura una ruta general para servir archivos de /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
