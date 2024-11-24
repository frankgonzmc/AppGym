import mongoose from "mongoose";

const rutinaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    totalEjercicios: {
        type: Number,
        min: 0,
    },
    ejerciciosCompletados: {
        type: Number,
        default: 0,
    },
    estadoRutinaRealizado: {
        type: Number,
        default: 0,
    },
    nivelRequerido: {
        type: String,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
        default: 'Principiante',
    },
    categoria: {
        type: String, // Por ejemplo, 'Cardio', 'Fuerza', 'Resistencia'
    },
    estado: {
        type: String,
        default: 'Pendiente',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Rutina", rutinaSchema);
