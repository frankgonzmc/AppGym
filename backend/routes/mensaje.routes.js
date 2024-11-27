import { Router } from 'express';
import Mensaje from '../models/mensaje.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Servidor SMTP
    port: parseInt(process.env.SMTP_PORT, 10) || 587, // Puerto: 587 para TLS
    secure: false, // Usar true para el puerto 465, false para 587
    auth: {
        user: process.env.EMAIL_USER, // Correo almacenado en el .env
        pass: process.env.EMAIL_PASS, // Contraseña o token de aplicación almacenado en el .env
    },
});

// Verificar conexión con el servidor SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error('Error al conectar con el servicio de correo:', error);
    } else {
        console.log('Conexión exitosa con el servicio de correo');
    }
});

router.post('/faq-supporting', async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Guardar en la base de datos
        const nuevoMensaje = new Mensaje({ nombre, correo, mensaje });
        await nuevoMensaje.save();

        // Configuración del correo
        const mailOptions = {
            from: `"${nombre}" <${correo}>`, // Correo del usuario
            to: process.env.EMAIL_USER, // Correo destinatario
            subject: `Nuevo mensaje de ${nombre}`,
            text: `
                Nombre: ${nombre}
                Correo: ${correo}
                Mensaje:
                ${mensaje}
            `,
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado y mensaje guardado con éxito.' });
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        res.status(500).json({ message: 'Hubo un problema al enviar el mensaje.' });
    }
});

export default router;
