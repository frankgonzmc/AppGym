export const PORT = process.env.PORT || 5000;
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://database/rutinabd";
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "sxsecretxs";
export const FRONTEND_URL = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(",").map(url => url.trim())
    : ["http://localhost:5173"];

