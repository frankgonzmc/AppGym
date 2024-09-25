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

    },
    estatura: {
        type: Number,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)
