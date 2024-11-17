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
    seriesProgreso: {
        type: Number,
        default: 0,
    },
    estado: {
        type: String,
        default: 'Pendiente',
    },
    caloriasQuemadas: {
        type: Number,
    },
    tiempoEstimado: {
        type: Number, // Duración estimada del ejercicio (en minutos)
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesrutinaSchema);
