import mongoose from "mongoose";


const rutinaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        default: 'Pendiente',
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
})

export default mongoose.model("Rutina", rutinaSchema);