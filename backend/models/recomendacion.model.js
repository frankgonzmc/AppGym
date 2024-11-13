import mongoose from "mongoose";

const recomendacionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ejercicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ejercicio',
        required: true,
    },
    motivo: {  // Explicación de por qué se recomienda
        type: String,
        required: true,
    },
    nivelSugerido: { // Nivel del usuario para quien se recomienda
        type: String,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Recomendacion", recomendacionSchema);
