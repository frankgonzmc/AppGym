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
        min: 0,
    },
    objetivos: {
        type: String,
        default: "",
    },
    nivelActividad: {
        type: String,
        default: "",
    },
    estatura: {
        type: Number,
        required: true,
        min: 0,
    },
    peso: {
        type: Number,
        required: true,
        min: 0,
    },
    profileImage: {
        type: String,
    },
    genero: {
        type: String,
        enum: ['varon', 'mujer', 'otro'],
        required: true,
    },
    nivel: {
        type: String,
        required: true,
        enum: ['Principiante', 'Intermedio', 'Avanzado'],
        default: 'Principiante',
    },
    ejerciciosCompletados: {
        type: Number,
        default: 0, // Total de ejercicios realizados
    },
    metasEjercicios: {
        type: Number,
        default: 10, // Meta para cambiar de nivel
    },
    caloriasQuemadas: {
        type: Number,
        default: 0, // Calorías totales quemadas
    },
    tiempoEntrenado: {
        type: Number,
        default: 0, // Tiempo total entrenado (en minutos)
    },
    estado: {
        type: String,
        default: "",
    },
    defaultToken: {
        type: String,
        default: "",
    },
    // Campos necesarios para recuperación de contraseña
    resetPasswordToken: {
        type: String,
        default: null, // Inicialmente null hasta que se genere un token
    },
    resetPasswordExpires: {
        type: Date,
        default: null, // Inicialmente null hasta que se genere una fecha de expiración
    },
}, {
    timestamps: true,
});

export default mongoose.model('User', userSchema);
