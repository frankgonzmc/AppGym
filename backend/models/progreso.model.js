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
    fecha : {
        type: Date,
        required: true,
    },
    estado: {
        type: String,
        default: 'Pendiente',
    },
}, {
    timestamps: true,
});

export default mongoose.model("Progreso", progresoSchema);
