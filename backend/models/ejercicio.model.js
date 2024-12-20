import mongoose from "mongoose";

const ejercicioSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    nivel: {
        type: String,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    series: {
        type: Number,
        required: true,
    },
    repeticiones: {
        type: Number,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    descanso: {
        type: Number,
        required: true,
    },
    calorias: {
        type: Number,
        default: 0,
    },
    caloriasPorRepeticion: {
        type: Number, // Estimación de calorías quemadas por repetición
        default: 0,
    },
    estado: {
        type: String,
    },
    estadoEjercicioRealizado: {
        type: Number,
        default: 0,
    },
    imagen: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Ejercicio", ejercicioSchema);
