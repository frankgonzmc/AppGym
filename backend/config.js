export const PORT = process.env.PORT || 5000; // El puerto interno del backend
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://database:27017/rutinabd"; // MongoDB interno en el contenedor
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "sxsecretxs";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/"; // Nuevo puerto externo del frontend
