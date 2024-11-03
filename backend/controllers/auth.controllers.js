import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password, edad, objetivos, estatura, peso, nivel, genero } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound)
            return res.status(400).json({ message: ["El email no es valido, o ya existe!"] });

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            edad,
            estatura,
            genero,
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
            objetivos: userSaved.objetivos,
            nivelActividad: userSaved.nivelActividad,
            peso: userSaved.peso,
            genero: userSaved.genero,
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
    const { email, password } = req.body;

    try {
        const userEncontrado = await User.findOne({ email });

        if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." });

        const isMatch = await bcrypt.compare(password, userEncontrado.password);

        if (!isMatch) return res.status(400).json({ message: "Credenciales Incorrectas" });

        const token = await createAccessToken({ id: userEncontrado._id });

        res.cookie('token', token);
        res.json({
            id: userEncontrado.id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            peso: userEncontrado.peso,
            edad: userEncontrado.edad,
            genero: userEncontrado.genero,
            objetivos: userEncontrado.objetivos,
            nivelActividad: userEncontrado.nivelActividad,
            estatura: userEncontrado.estatura,
            nivel: userEncontrado.nivel,
            createdAt: userEncontrado.createdAt,
            updatedAt: userEncontrado.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar token y cerrar sesión
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

// Seleccionar el perfil del usuario
export const profile = async (req, res) => {
    try {
        const userEncontrado = await User.findById(req.user.id);

        if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." });

        return res.json({
            id: userEncontrado.id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            edad: userEncontrado.edad,
            genero: userEncontrado.genero,
            objetivos: userEncontrado.objetivos,
            nivelActividad: userEncontrado.nivelActividad,
            profileImage: userEncontrado.profileImage,
            estatura: userEncontrado.estatura,
            peso: userEncontrado.peso,
            nivel: userEncontrado.nivel,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Verificación de token
export const verifityToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "NO AUTORIZADO" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "NO AUTORIZADO" });

        try {
            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(401).json({ message: "NO AUTORIZADO" });

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                edad: userFound.edad,
                estatura: userFound.estatura,
                objetivos: userFound.objetivos,
                nivelActividad: userFound.nivelActividad,
                genero: userFound.genero,
                profileImage: userFound.profileImage,
                peso: userFound.peso,
                nivel: userFound.nivel,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
}

// Ruta para verificar si el email existe
export const checkEmail = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email es requerido." });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El email ya está en uso." });
        }

        res.status(200).json({ message: "Email disponible." });
    } catch (error) {
        console.error("Error al verificar email:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updatePerfil = async (req, res) => {
    const userId = req.user.id; // Obtén el ID del usuario autenticado
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    try {
        const { username, email, edad, estatura, peso, objetivos, nivelActividad, genero } = req.body;
        const profileImage = req.file ? req.file.path : undefined; // Obtiene la ruta de la imagen si se subió

        // Actualiza solo los campos que se han modificado
        if (username) user.username = username;
        if (email) user.email = email;
        if (edad) user.edad = edad;
        if (objetivos) user.objetivos = objetivos;
        if (nivelActividad) user.nivelActividad = nivelActividad;
        if (estatura) user.estatura = estatura;
        if (peso) user.peso = peso;
        if (genero) user.genero = genero; // Asigna el nuevo género si se proporciona
        if (profileImage) {
            user.profileImage = profileImage;
            console.log(`Imagen guardada en: ${profileImage}`);
        }
        
        // Guarda los cambios en la base de datos
        await user.save();
        return res.status(200).json(user); // Asegúrate de devolver el objeto del usuario actualizado
    } catch (error) {
        console.error("Error en updatePerfil:", error); // Agrega un log para depurar
        return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};

// Actualizar Password
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

        res.status(200).json({ message: "Se ha enviado un correo para restablecer la contraseña." });
    } catch (error) {
        console.error("Error en forgotPassword:", error); // Para ver errores en el backend
        res.status(500).json({ message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Token no válido o ha expirado." });

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Contraseña restablecida correctamente." });
    } catch (error) {
        console.error("Error en resetPassword:", error); // Para ver errores en el backend
        res.status(500).json({ message: error.message });
    }
};
