import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rutina: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rutina',
        required: true,
    },
    fechaInicio: {
        type: Date,
        default: Date.now,
    },
    fechaFin: {
        type: Date,
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'En Progreso', 'Completado', 'Cancelado'],
        default: 'Pendiente',
    },
    tiempoTotal: {
        type: Number, // Tiempo total invertido (en minutos)
    },
    caloriasQuemadas: {
        type: Number, // Calorías estimadas quemadas
    },
    notas: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Progreso", progresoSchema);
