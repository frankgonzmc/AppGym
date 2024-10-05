import mongoose from "mongoose";

const detallesrutinaSchema = new mongoose.Schema({
    rutina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rutina',
        required: true,
    },
    ejercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ejercicio',
        required: true,
    },
    seriesProgreso: { // Nuevo campo
        type: Number,
        default: 0, // Comienza en 0
    },
    repeticionesProgreso: { // Nuevo campo
        type: Number,
        default: 0, // Comienza en 0
    },
    estado:{
        type: String,
        default: 'Pendiente', // Por defecto, todos los detalles de rutina están pendientes de completar
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesrutinaSchema);
