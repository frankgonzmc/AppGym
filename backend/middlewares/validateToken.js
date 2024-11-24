import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies; // Obtiene el token desde las cookies
    if (!token) {
        return res.status(401).json({ message: "No autorizado. Token no encontrado." });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET); // Verifica el token
        req.user = decoded; // Adjunta los datos del usuario al objeto de la solicitud
        next(); // Continúa al siguiente middleware
    } catch (error) {
        console.error("Error verificando el token:", error.message);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};
