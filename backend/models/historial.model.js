import mongoose from 'mongoose'

const historialSchema = new mongoose.Schema({
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
    estado: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Historial", historialSchema);