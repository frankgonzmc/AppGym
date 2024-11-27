import mongoose from "mongoose";

const MensajeSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    mensaje: { type: String, required: true },
    fechaEnvio: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export default mongoose.model('Mensaje', MensajeSchema);
