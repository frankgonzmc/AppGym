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
    total: {
        type: Number,
        required: true,
    },
    duracion: {
        type: Number, // Duración en segundos, útil para ejercicios de cardio
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesrutinaSchema);
