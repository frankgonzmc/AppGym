import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from "./routes/auth.routes.js";
import rutinaRoutes from "./routes/rutina.routes.js";
import ejercicioRoutes from "./routes/ejercicio.routes.js";
import progresoRoutes from "./routes/progreso.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", rutinaRoutes);
app.use("/api", ejercicioRoutes);
app.use("/api", progresoRoutes);

export default app;