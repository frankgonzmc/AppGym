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
    categoria: {
        type: String,
        required: true,
    },
    duracion: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
})

export default mongoose.model("Ejercicio", ejercicioSchema)