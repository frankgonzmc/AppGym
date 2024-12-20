import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import rutinaRoutes from "./routes/rutina.routes.js";
import ejercicioRoutes from "./routes/ejercicio.routes.js";
import mensajeRoutes from "./routes/mensaje.routes.js";
import progresoRoutes from "./routes/progreso.routes.js";
import detallerutinaRoutes from './routes/detallerutina.routes.js';
import recomendacionRoutes from './routes/recomendacion.routes.js';
import { FRONTEND_URL } from "./config.js"; // Importa el array procesado
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config(); // Asegúrate de cargar las variables de entorno antes de usar cualquier configuración

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.get('/api/dieta', async (req, res) => {
    const { content } = req.query;

    try {
        const response = await axios.get('https://71da-34-48-98-94.ngrok-free.app/dieta', {
            params: { content },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data); // Devuelve la respuesta al frontend
    } catch (error) {
        console.error('Error al conectar con el API externo:', error.message);
        res.status(500).json({ error: 'Error al conectar con el API externo.' });
    }
});


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Rutas de tu aplicación
app.use("/api", authRoutes);
app.use("/api", mensajeRoutes);
app.use("/api", rutinaRoutes);
app.use("/api", ejercicioRoutes);
app.use("/api", progresoRoutes);
app.use("/api", detallerutinaRoutes);
app.use('/api', recomendacionRoutes);

// Configura una ruta general para servir archivos de /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
