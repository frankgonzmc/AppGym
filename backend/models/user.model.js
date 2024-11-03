import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    edad: {
        type: Number,
        required: true,
        min: 0,  // mínimo
    },
    objetivos: {
        type: String,
        default: "",
        unique: true,
    },
    nivelActividad: {
        type: String,
        default: "",
        unique: true,
    },
    estatura: {
        type: Number,
        required: true,
        min: 0,  // mínimo
    },
    peso: {
        type: Number,
        required: true,
        min: 0,  // mínimo
    },
    profileImage: {
        type: String,
    },
    genero: {
        type: String,
        enum: ['varon', 'mujer', 'otro'],
        required: true
    },
    nivel: {
        type: String,
        required: true,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
    },
    estado: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)
