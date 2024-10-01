import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password, edad, estatura, peso, nivel } = req.body

    try {
        const userFound = await User.findOne({ email })
        if (userFound)
            return res.status(400).json({ message: ["El email no es valido, o  ya existe!"] })

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            edad,
            estatura,
            peso,
            nivel,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            edad: userSaved.edad,
            estatura: userSaved.estatura,
            peso: userSaved.peso,
            nivel: userSaved.nivel,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const userEncontrado = await User.findOne({ email });

        if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." });

        const isMacth = await bcrypt.compare(password, userEncontrado.password);

        if (!isMacth) return res.status(400).json({ message: "Credenciales Incorrectas" });

        const token = await createAccessToken({ id: userEncontrado._id });

        res.cookie('token', token);
        res.json({
            id: userEncontrado.id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            peso: userEncontrado.peso,
            edad: userEncontrado.edad,
            estatura: userEncontrado.estatura,
            nivel: userEncontrado.nivel,
            createdAt: userEncontrado.createdAt,
            updatedAt: userEncontrado.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const userEncontrado = await User.findById(req.user.id)

    if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." })

    return res.json({
        id: userEncontrado.id,
        username: userEncontrado.username,
        email: userEncontrado.email,
        edad: userEncontrado.edad,
        estatura: userEncontrado.estatura,
        peso: userEncontrado.peso,
        nivel: userEncontrado.nivel,
    });
}

export const verifityToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "NO AUTORIZADO" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "NO AUTORIZADO" })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: "NO ATORIZADO" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            edad: userFound.edad,
            estatura: userFound.estatura,
            peso: userFound.peso,
            nivel: userFound.nivel,
        })

    })
}

export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        // Comprobar si el usuario existe
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        // Verificar la contraseña actual
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "La contraseña actual es incorrecta" });

        // Actualizar la contraseña
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    console.log(req.body); // Asegúrate de ver qué estás recibiendo
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            subject: 'Recuperación de Contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: 
                   http://localhost:5000/api/reset-password/${token}`,
        };

        await transporter.sendMail(mailOptions)
            .then(() => {
                res.status(200).json({ message: "Se ha enviado un correo para restablecer la contraseña." });
            })
            .catch(error => {
                console.error("Error al enviar el correo:", error); // Log del error
                res.status(500).json({ message: "Error al enviar el correo." });
            });

        res.status(200).json({ message: "Se ha enviado un correo para restablecer la contraseña." });
    } catch (error) {
        console.error("Error en forgotPassword:", error); // Para ver errores en el backend
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ message: "Token inválido o expirado" });

        // Actualizar la contraseña
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined; // Limpiar el token
        user.resetPasswordExpires = undefined; // Limpiar la expiración
        await user.save();

        res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
