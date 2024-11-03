import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import rutinaRoutes from "./routes/rutina.routes.js";
import ejercicioRoutes from "./routes/ejercicio.routes.js";
import progresoRoutes from "./routes/progreso.routes.js";
import detallerutinaRoutes from './routes/detallerutina.routes.js';
import { FRONTEND_URL } from "./config.js";
import { fileURLToPath } from 'url';  // Importar esta utilidadimport dotenv from 'dotenv';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(multer({
    dest: './uploads/perfil'
}).single('profileImage'));

app.use("/api", authRoutes);
app.use("/api", rutinaRoutes);
app.use("/api", ejercicioRoutes);
app.use("/api", progresoRoutes);
app.use("/api", detallerutinaRoutes);


app.use('/uploads/ejercicios', express.static(path.join(__dirname, 'uploads/ejercicios')));

export default app;