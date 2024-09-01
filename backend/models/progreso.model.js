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
    fecha: {
        type: Date,
        required: true,
    },
    notas: {
        type: String, // TEXT en SQL es equivalente a String en MongoDB
        required: false,
    },
    estado: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Progreso", progresoSchema);
