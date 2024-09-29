import mongoose from "mongoose";
import Ejercicio from "../models/ejercicio.model.js"; // Ajusta la ruta según sea necesario
import { connectDB } from "../db.js"; // Importa tu función de conexión

const ejerciciosPredeterminados = [
    {
        "codigo": "EJ001",
        "nombre": "Flexiones",
        "descripcion": "Ejercicio para fortalecer el pecho y tríceps.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 10,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ002",
        "nombre": "Sentadillas",
        "descripcion": "Ejercicio para fortalecer los muslos y glúteos.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 8,
        "duracion": 30,
        "descanso": 15,
        "repeticiones": 3,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ003",
        "nombre": "Plancha",
        "descripcion": "Ejercicio para fortalecer el core.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 5,
        "duracion": 60,
        "descanso": 20,
        "repeticiones": 1,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ004",
        "nombre": "Burpees",
        "descripcion": "Ejercicio para mejorar la resistencia cardiovascular.",
        "nivel": "Avanzado",
        "categoria": "Cardio",
        "series": 6,
        "duracion": 30,
        "descanso": 15,
        "repeticiones": 5,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ005",
        "nombre": "Zancadas",
        "descripcion": "Ejercicio para fortalecer las piernas.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 8,
        "duracion": 25,
        "descanso": 10,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ006",
        "nombre": "Dominadas",
        "descripcion": "Ejercicio para fortalecer la espalda y los brazos.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 5,
        "duracion": 15,
        "descanso": 30,
        "repeticiones": 3,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ007",
        "nombre": "Abdominales",
        "descripcion": "Ejercicio para fortalecer los músculos del abdomen.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 10,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ008",
        "nombre": "Saltos en caja",
        "descripcion": "Ejercicio pliométrico para mejorar la explosividad.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 6,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ009",
        "nombre": "Flexiones diamante",
        "descripcion": "Variación de flexiones para trabajar tríceps.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 10,
        "duracion": 25,
        "descanso": 10,
        "repeticiones": 3,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ010",
        "nombre": "Mountain climbers",
        "descripcion": "Ejercicio cardiovascular para quemar grasa.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 6,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ011",
        "nombre": "Peso muerto",
        "descripcion": "Ejercicio compuesto para trabajar todo el cuerpo.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 5,
        "duracion": 30,
        "descanso": 30,
        "repeticiones": 2,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ012",
        "nombre": "Press de banca",
        "descripcion": "Ejercicio para fortalecer el pecho.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 6,
        "duracion": 25,
        "descanso": 20,
        "repeticiones": 3,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ013",
        "nombre": "Remo con barra",
        "descripcion": "Ejercicio para fortalecer la espalda.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 8,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ014",
        "nombre": "Press militar",
        "descripcion": "Ejercicio para fortalecer los hombros.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 6,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ015",
        "nombre": "Elevaciones laterales",
        "descripcion": "Ejercicio para los deltoides.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 8,
        "duracion": 15,
        "descanso": 10,
        "repeticiones": 3,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ016",
        "nombre": "Correr",
        "descripcion": "Ejercicio para mejorar la resistencia cardiovascular.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 1,
        "duracion": 30,
        "descanso": 60,
        "repeticiones": 1,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ017",
        "nombre": "Bicicleta estacionaria",
        "descripcion": "Ejercicio cardiovascular para quemar calorías.",
        "nivel": "Principiante",
        "categoria": "Cardio",
        "series": 1,
        "duracion": 45,
        "descanso": 30,
        "repeticiones": 1,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ018",
        "nombre": "Press francés",
        "descripcion": "Ejercicio para trabajar los tríceps.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 8,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ019",
        "nombre": "Curl de bíceps",
        "descripcion": "Ejercicio para fortalecer los bíceps.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 10,
        "duracion": 20,
        "descanso": 15,
        "repeticiones": 4,
        "estado": "En proceso"
    },
    {
        "codigo": "EJ020",
        "nombre": "Jumping Jacks",
        "descripcion": "Ejercicio para mejorar la resistencia y quemar calorías.",
        "nivel": "Principiante",
        "categoria": "Cardio",
        "series": 6,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 4,
        "estado": "En proceso"
    }
];


const seedEjercicios = async () => {
    try {
        await connectDB();

        // Verificar si ya existen documentos en la colección
        const count = await Ejercicio.countDocuments();
        if (count > 0) {
            console.log("Los ejercicios ya existen en la base de datos. Seeding no es necesario.");
            return;
        }

        // Inserta los ejercicios predeterminados
        const result = await Ejercicio.insertMany(ejerciciosPredeterminados);
        console.log("Datos predeterminados agregados:", result);
    } catch (error) {
        console.error("Error al agregar datos:", error);
    } finally {
        mongoose.connection.close();
    }
};

export default seedEjercicios;