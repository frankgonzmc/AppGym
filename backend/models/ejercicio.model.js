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
    duracion: {
        type: Number,
        required: true,
    },
    descanso: {
        type: Number,
        required: true,
    },
    repeticiones: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    seriesCompletar: { // Nuevo campo
        type: Number,
        required: false,
    },
    seriesProgreso: { // Nuevo campo
        type: Number,
        default: 0, // Comienza en 0
    },
}, {
    timestamps: true,
})

export default mongoose.model("Ejercicio", ejercicioSchema);
