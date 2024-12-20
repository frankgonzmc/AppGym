import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            edad,
            estatura,
            peso,
            genero,
            nivel = 'Principiante',
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El email no es valido!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            edad,
            estatura,
            peso,
            genero,
            nivel,
            defaultToken: crypto.randomBytes(16).toString('hex'), // Otro token
        });

        const savedUser = await newUser.save();
        const token = createAccessToken({ id: savedUser._id });

        res.cookie('token', token, {
            httpOnly: false,
            //{/*secure: process.env.NODE_ENV === 'production',*/},
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            genero: savedUser.genero,
            nivel: savedUser.nivel,
            edad: savedUser.edad,
        });
    } catch (error) {
        //console.error("Error en el registro:", error);
        return res.status(500).json({ message: "Error en el servidor" });
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

        res.cookie('token', token, {
            httpOnly: false, // No permite que JavaScript del cliente acceda a la cookie
            //secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
            sameSite: 'strict', // Previene ataques CSRF
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });

        res.json({
            id: userEncontrado._id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            edad: userEncontrado.edad,
            genero: userEncontrado.genero,
            objetivos: userEncontrado.objetivos,
            nivelActividad: userEncontrado.nivelActividad,
            profileImage: userEncontrado.profileImage,
            estatura: userEncontrado.estatura,
            estado: userEncontrado.estado,
            peso: userEncontrado.peso,
            nivel: userEncontrado.nivel,
            ejerciciosCompletados: userEncontrado.ejerciciosCompletados,
            metasEjercicios: userEncontrado.metasEjercicios,
            caloriasQuemadas: userEncontrado.caloriasQuemadas,
            tiempoEntrenado: userEncontrado.tiempoEntrenado,
            newToken: userEncontrado.newToken,
            resetPasswordToken: userEncontrado.resetPasswordToken,
            resetPasswordExpires: userEncontrado.resetPasswordExpires,
            defaultToken: userEncontrado.defaultToken,
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
        httpOnly: false, // Igual que al configurar
        secure: process.env.NODE_ENV === 'production', // Igual que al configurar
        sameSite: 'strict', // Igual que al configurar
        maxAge: 0, // Expira inmediatamente
    });
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
};
// Seleccionar el perfil del usuario
export const profile = async (req, res) => {
    try {
        const userEncontrado = await User.findById(req.user.id);

        if (!userEncontrado) return res.status(400).json({ message: "Usuario no encontrado..." });

        return res.json({
            id: userEncontrado._id,
            username: userEncontrado.username,
            email: userEncontrado.email,
            edad: userEncontrado.edad,
            genero: userEncontrado.genero,
            objetivos: userEncontrado.objetivos,
            nivelActividad: userEncontrado.nivelActividad,
            profileImage: userEncontrado.profileImage,
            estatura: userEncontrado.estatura,
            estado: userEncontrado.estado,
            peso: userEncontrado.peso,
            nivel: userEncontrado.nivel,
            ejerciciosCompletados: userEncontrado.ejerciciosCompletados,
            metasEjercicios: userEncontrado.metasEjercicios,
            caloriasQuemadas: userEncontrado.caloriasQuemadas,
            tiempoEntrenado: userEncontrado.tiempoEntrenado,
            newToken: userEncontrado.newToken,
            resetPasswordToken: userEncontrado.resetPasswordToken,
            resetPasswordExpires: userEncontrado.resetPasswordExpires,
            defaultToken: userEncontrado.defaultToken,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Verificación de token
export const verifityToken = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "NO AUTORIZADO" });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "NO AUTORIZADO" });

        try {
            const userFound = await User.findById(user.id);
            if (!userFound) return res.status(401).json({ message: "NO AUTORIZADO" });

            // Devuelve los datos necesarios del usuario
            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                edad: userFound.edad,
                genero: userFound.genero,
                objetivos: userFound.objetivos,
                nivelActividad: userFound.nivelActividad,
                profileImage: userFound.profileImage,
                estatura: userFound.estatura,
                estado: userFound.estado,
                peso: userFound.peso,
                nivel: userFound.nivel,
                ejerciciosCompletados: userFound.ejerciciosCompletados,
                metasEjercicios: userFound.metasEjercicios,
                caloriasQuemadas: userFound.caloriasQuemadas,
                tiempoEntrenado: userFound.tiempoEntrenado,
                newToken: userFound.newToken,
                resetPasswordToken: userFound.resetPasswordToken,
                resetPasswordExpires: userFound.resetPasswordExpires,
                defaultToken: userFound.defaultToken,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });
};

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

// Actualizar Perfil (con imagen)
export const updatePerfil = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    try {
        const { username, email, edad, estatura, peso, objetivos, nivelActividad, genero, defaultToken } = req.body;
        const profileImage = req.file ? `/uploads/perfil/${userId}.jpg` : user.profileImage;

        if (username) user.username = username;
        if (email) user.email = email;
        if (edad) user.edad = edad;
        if (objetivos) user.objetivos = objetivos;
        if (nivelActividad) user.nivelActividad = nivelActividad;
        if (estatura) user.estatura = estatura;
        if (peso) user.peso = peso;
        if (genero) user.genero = genero;
        if (profileImage) user.profileImage = profileImage;
        if (defaultToken) user.defaultToken = defaultToken;


        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error en updatePerfil:", error);
        return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};

export const updateDatosPerfil = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    console.log("Estado recibido:", req.body.estado);  // Log para verificar valor

    try {
        const { estado, objetivos, nivelActividad, defaultToken } = req.body;

        if (estado !== undefined) user.estado = estado;  // Cambié la condición a !== undefined
        if (objetivos) user.objetivos = objetivos;
        if (nivelActividad) user.nivelActividad = nivelActividad;
        if (defaultToken) user.defaultToken = defaultToken;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error en updatePerfil:", error);
        return res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
    }
};


export const updateTokenPerfil = async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    console.log("Usuario Encontrado: ", user);  // Log para verificar valor

    try {
        const { newToken, resetPasswordToken, resetPasswordExpires } = req.body;

        if (newToken) user.newToken = newToken;
        if (resetPasswordToken) user.resetPasswordToken = resetPasswordToken;
        if (resetPasswordExpires) user.resetPasswordExpires = resetPasswordExpires;

        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error en updatePerfil:", error);
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

// Configuración de recuperación de contraseña
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

        // Generar token y establecer tiempo de expiración
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();


        try {
            await user.save();
            console.log("Token almacenado correctamente en la base de datos.");
        } catch (error) {
            console.error("Error al guardar el token en la base de datos:", error);
        }

        console.log("Token generado:", token);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `http://localhost:5173/reset-password/${token}`;
        const mailOptions = {
            to: user.email,
            subject: 'Recuperación de Contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Correo enviado. Revisa tu bandeja de entrada." });
    } catch (error) {
        console.error("Error en forgotPassword:", error);
        res.status(500).json({ message: error.message });
    }
};

//resetear contraseña
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Validar que no haya expirado
        });

        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Actualizar usuario con nueva contraseña y resetear tokens
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.defaultToken = token; // Configurar el nuevo token como default
        await user.save();

        res.status(200).json({ message: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error('Error en resetPassword:', error);
        res.status(500).json({ message: 'Error al restablecer contraseña', error: error.message });
    }
};

export const updatePreferences = async (req, res) => {
    const { userId } = req.params;
    const { tipo, intensidad, frecuencia } = req.body;
    await User.findByIdAndUpdate(userId, { preferencias: { tipo, intensidad, frecuencia } });
    res.json({ message: 'Preferencias actualizadas' });
};

export const actualizarNivelUsuario = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        const { ejerciciosCompletados, metasEjercicios, nivel } = user;

        if (nivel === 'Principiante' && ejerciciosCompletados >= metasEjercicios) {
            user.nivel = 'Intermedio';
            user.metasEjercicios += 20; // Nueva meta para Avanzado
        } else if (nivel === 'Intermedio' && ejerciciosCompletados >= metasEjercicios) {
            user.nivel = 'Avanzado';
        }

        await user.save();
        console.log(`Nivel actualizado para el usuario ${userId}: ${user.nivel}`);
    } catch (error) {
        console.error("Error actualizando nivel del usuario:", error);
        throw error;
    }
};
