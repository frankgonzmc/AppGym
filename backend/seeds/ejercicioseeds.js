import mongoose from "mongoose";
import Ejercicio from "../models/ejercicio.model.js"; // Ajusta la ruta según sea necesario
import { connectDB } from './db.js';

const ejerciciosPredeterminados = [
    {
        codigo: "EJ001",
        nombre: "Flexiones",
        descripcion: "Ejercicio para fortalecer el pecho y tríceps.",
        categoria: "Fuerza",
        duracion: 10,
        estado: "En proceso"
    },
    {
        codigo: "EJ002",
        nombre: "Sentadillas",
        descripcion: "Ejercicio para fortalecer las piernas.",
        categoria: "Fuerza",
        duracion: 5,
        estado: "En proceso"
    },
    {
        codigo: "EJ003",
        nombre: "Abdominales",
        descripcion: "Ejercicio para fortalecer el abdomen.",
        categoria: "Fuerza",
        duracion: 10,
        estado: "En proceso"
    },
    {
        codigo: "EJ004",
        nombre: "Plancha",
        descripcion: "Ejercicio para fortalecer el core.",
        categoria: "Fuerza",
        duracion: 10,
        estado: "En proceso"
    },
    {
        codigo: "EJ005",
        nombre: "Saltos de tijera",
        descripcion: "Ejercicio cardiovascular para mejorar la resistencia.",
        categoria: "Cardio",
        duracion: 5,
        estado: "En proceso"
    },
    {
        codigo: "EJ006",
        nombre: "Correr",
        descripcion: "Ejercicio cardiovascular para mejorar la resistencia.",
        categoria: "Cardio",
        duracion: 25,
        estado: "En proceso"
    },
    {
        codigo: "EJ007",
        nombre: "Burpees",
        descripcion: "Ejercicio completo que combina fuerza y cardio.",
        categoria: "Fuerza/Cardio",
        duracion: 20,
        estado: "En proceso"
    }
    // Agrega más ejercicios según sea necesario
];


const seedDatabase = async () => {
    try {
        await connectDB(); // Conéctate a la base de datos
        console.log("Conectado a la base de datos");

        // Limpia la colección antes de agregar datos (opcional)
        await Ejercicio.deleteMany();

        // Inserta los ejercicios predeterminados
        await Ejercicio.insertMany(ejerciciosPredeterminados);
        
        console.log("Datos predeterminados agregados");
    } catch (error) {
        console.error("Error al agregar datos:", error);
    } finally {
        mongoose.connection.close(); // Cierra la conexión
    }
};

seedDatabase();