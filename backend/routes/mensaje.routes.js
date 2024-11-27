import Mensaje from '../models/mensaje.model.js';

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
            from: process.env.EMAIL,
            to: process.env.EMAIL,
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
