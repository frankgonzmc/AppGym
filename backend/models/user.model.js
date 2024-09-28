import mongoose, { mongo } from "mongoose";

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
        min: 0,  // Puedes establecer un límite mínimo
    },
    estatura: {
        type: Number,
        required: true,
        min: 0,  // Puedes establecer un límite mínimo
    },
    peso: {
        type: Number,
        required: true,
        min: 0,  // Puedes establecer un límite mínimo
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
