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
    },
    estadoEjercicioRealizado: {
        type: Number,
        default: 0,
    },
    caloriasQuemadas: {
        type: Number,
        default: 0,
    },
    tiempoEstimado: {
        type: Number, // Duración estimada del ejercicio (en minutos)
        default: 0,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesrutinaSchema);
