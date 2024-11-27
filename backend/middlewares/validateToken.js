import { TOKEN_SECRET } from '../config.js';
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

            //console.log("Usuario autenticado:", decoded);

            if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
                console.error("El ID en el token no es un ObjectId válido:", decoded.id);
                return res.status(400).json({ message: "ID en el token no válido" });
            }

            req.user = decoded; // Propagar el usuario
            next();
        });
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ message: error.message });
    }
};
