import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    try {
        // Extrae el token desde las cookies
        const token = req.cookies?.token;

        if (!token) {
            console.error("Token no encontrado en las cookies.");
            return res.status(401).json({ message: "No se encontró un token, acceso denegado." });
        }

        // Verifica el token
        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.error("Error verificando token:", error);
                return res.status(401).json({ message: "El token no es válido o ha expirado." });
            }

            // Decodifica el token y almacena la información del usuario en `req.user`
            req.user = decoded;
            console.log("Usuario autenticado:", decoded);

            next();
        });
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
