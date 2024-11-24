import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    // Renovar el token
                    const newToken = await createAccessToken({ id: user.id });
                    res.cookie('token', newToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 24 * 60 * 60 * 1000, // 1 día
                    });
                    return res.status(200).json({ message: "Token renovado", token: newToken });
                }
                return res.status(403).json({ message: "Token inválido" });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Error en el middleware de autenticación:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
