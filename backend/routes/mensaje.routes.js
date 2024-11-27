import { Router } from 'express';
import Mensaje from '../models/mensaje.model.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com', // Cambiar según el servicio
    port: process.env.SMTP_PORT || 587, // 587 para TLS, 465 para SSL
    secure: false, // false para TLS
    auth: {
        user: process.env.EMAIL, // Correo del remitente (desde el .env)
        pass: process.env.EMAIL_PASSWORD, // Contraseña o token de aplicación (desde el .env)
    },
});

// Verificar conexión con el servidor SMTP
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

        // Enviar correo al correo almacenado en el .env
        const mailOptions = {
            from: `"${nombre}" <${correo}>`, // Nombre y correo del usuario
            to: process.env.EMAIL, // Tu correo destino desde el .env
            subject: `Nuevo mensaje de ${nombre}`,
            text: `
                Nombre: ${nombre}
                Correo: ${correo}
                Mensaje:
                ${mensaje}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado y mensaje guardado con éxito.' });
    } catch (error) {
        console.error('Error al procesar el mensaje:', error);
        res.status(500).json({ message: 'Hubo un problema al enviar el mensaje.' });
    }
});

export default router;
