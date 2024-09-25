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
    password: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)
