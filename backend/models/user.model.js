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
        default: null,
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'], // Añade los valores válidos aquí
        required: true
    },
    nivel: {
        type: String,
        required: true,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)
