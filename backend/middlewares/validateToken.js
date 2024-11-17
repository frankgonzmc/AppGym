import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;
        //console.log("Token recibido:", token);

        if (!token) {
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        }

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {
                console.error("Error al verificar token:", error.message);
                return res.status(401).json({ message: "Token is not valid" });
            }
            req.user = user;
            //console.log("Usuario autenticado:", user);
            next();
        });
    } catch (error) {
        console.error("Error en authRequired:", error.message);
        return res.status(500).json({ message: error.message });
    }
};
