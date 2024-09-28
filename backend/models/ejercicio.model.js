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
    nivel:{
        type: String,
        required: true,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
    },
    categoria: {
        type: String,
        required: true,
    },
    series:{
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
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Ejercicio", ejercicioSchema)