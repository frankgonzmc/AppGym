import mongoose from "mongoose";

const detallesRutinaSchema = new mongoose.Schema({
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
    orden: {
        type: Number,
        required: true,
    },
    series: {
        type: Number,
        required: true,
    },
    repeticiones: {
        type: Number, // Esto es específico para ejercicios de fuerza
        required: true,
    },
    duracion: {
        type: Number, // Duración en segundos, útil para ejercicios de cardio
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesRutinaSchema);
