import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken';

export function createAccessToken(usload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            usload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        )
    })
}
