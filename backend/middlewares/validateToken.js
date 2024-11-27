import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import User from '../models/user.model.js';

export const authRequired = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

        req.user = user; // Adjunta el usuario al objeto req
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
};

/*import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            console.error("Token no encontrado en las cookies.");
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                console.error("Error verificando token:", error);
                return res.status(401).json({ message: "Token is not valid" });
            }

            console.log("Usuario autenticado:", decoded);
            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ message: error.message });
    }
};
*/