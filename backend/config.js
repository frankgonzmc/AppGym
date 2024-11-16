import dotenv from 'dotenv';
dotenv.config();

export const PORT = 5000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://database/rutinabd";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "sxsecretxs";
// Divide FRONTEND_URL en un array, o usa un valor por defecto
export const FRONTEND_URL = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173"];
