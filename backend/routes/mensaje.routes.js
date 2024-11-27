import { Router } from 'express';
import Mensaje from '../models/mensaje.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Cambiar si usas otro servicio
    port: process.env.SMTP_PORT || 587,
    secure: false, // Usar false para el puerto 587 y true para el puerto 465
    auth: {
        user: process.env.EMAIL, // Tu correo desde el archivo .env
        pass: process.env.EMAIL_PASSWORD, // Contraseña o token de aplicación desde el archivo .env
    },
});

transporter.verify((error) => {
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

        // Enviar correo
        await transporter.sendMail({
            from: correo,
            to: process.env.EMAIL, // Dirección de destino desde .env
            subject: `Nuevo mensaje de ${nombre}`,
            text: `
                Nombre: ${nombre}
                Correo: ${correo}
                Mensaje:
                ${mensaje}
            `,
        });

        res.status(200).json({ message: 'Correo enviado y mensaje guardado con éxito.' });
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        res.status(500).json({ message: 'Hubo un problema al enviar el mensaje.' });
    }
});

export default router;
