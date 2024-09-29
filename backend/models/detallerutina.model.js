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
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.model("DetallesRutina", detallesrutinaSchema);
