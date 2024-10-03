import Ejercicio from "../models/ejercicio.model.js"; // Ajusta la ruta según sea necesario
import { connectDB } from "../db.js"; // Importa tu función de conexión

const ejerciciosPredeterminados = [
    {
        "codigo": "EJ001",
        "nombre": "Flexiones",
        "descripcion": "Ejercicio para fortalecer el pecho y tríceps.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/pushup.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ002",
        "nombre": "Sentadillas",
        "descripcion": "Ejercicio para fortalecer los muslos y glúteos.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/sentadillas.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ003",
        "nombre": "Planchas estaticas",
        "descripcion": "Ejercicio para fortalecer el core.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/planchas.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ004",
        "nombre": "Burpees",
        "descripcion": "Ejercicio para mejorar la resistencia cardiovascular.",
        "nivel": "Avanzado",
        "categoria": "Cardio",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/burpees.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ005",
        "nombre": "Zancadas",
        "descripcion": "Ejercicio para fortalecer las piernas.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/Zancadas.webp" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ006",
        "nombre": "Dominadas Elevados",
        "descripcion": "Ejercicio para fortalecer la espalda y los brazos.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/dominadas.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ007",
        "nombre": "Abdominales",
        "descripcion": "Ejercicio para fortalecer los músculos del abdomen.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/abdominales.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ008",
        "nombre": "Saltos en caja",
        "descripcion": "Ejercicio pliométrico para mejorar la explosividad.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/saltosencaja.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ009",
        "nombre": "Flexiones diamante",
        "descripcion": "Variación de flexiones para trabajar tríceps.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/flexionesdiamantes.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ010",
        "nombre": "Mountain climbers",
        "descripcion": "Ejercicio cardiovascular para quemar grasa.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/mountainclimbers.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ011",
        "nombre": "Peso muerto",
        "descripcion": "Ejercicio compuesto para trabajar todo el cuerpo.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/pesomuerto.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ012",
        "nombre": "Press de banca",
        "descripcion": "Ejercicio para fortalecer el pecho.",
        "nivel": "Avanzado",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/pressdebanca.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ013",
        "nombre": "Remo con barra en Punta",
        "descripcion": "Ejercicio para fortalecer la espalda.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 4,
        "seriesCompletar": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "imagen": "http://localhost:5000/uploads/remo-en-punta-gif.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ014",
        "nombre": "Press militar",
        "descripcion": "Ejercicio para fortalecer los hombros.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "seriesCompletar": 4,
        "imagen": "http://localhost:5000/uploads/pressmilitar.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ015",
        "nombre": "Elevaciones laterales",
        "descripcion": "Ejercicio para los deltoides.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "seriesCompletar": 4,
        "imagen": "http://localhost:5000/uploads/elevacioneslaterales.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ016",
        "nombre": "Correr",
        "descripcion": "Ejercicio para mejorar la resistencia cardiovascular.",
        "nivel": "Intermedio",
        "categoria": "Cardio",
        "series": 1,
        "duracion": 180,
        "descanso": 60,
        "repeticiones": 1,
        "estado": "En proceso",
        "seriesCompletar": 1,
        "imagen": "http://localhost:5000/uploads/correr.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ017",
        "nombre": "Bicicleta estacionaria",
        "descripcion": "Ejercicio cardiovascular para quemar calorías.",
        "nivel": "Principiante",
        "categoria": "Cardio",
        "series": 1,
        "duracion": 300,
        "descanso": 60,
        "repeticiones": 1,
        "estado": "En proceso",
        "seriesCompletar": 1,
        "imagen": "http://localhost:5000/uploads/bicicletaestacionaria.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ018",
        "nombre": "Press francés",
        "descripcion": "Ejercicio para trabajar los tríceps.",
        "nivel": "Intermedio",
        "categoria": "Fuerza",
        "series": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "seriesCompletar": 4,
        "imagen": "http://localhost:5000/uploads/pressfrances.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ019",
        "nombre": "Curl de bíceps alternados",
        "descripcion": "Ejercicio para fortalecer los bíceps.",
        "nivel": "Principiante",
        "categoria": "Fuerza",
        "series": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "seriesCompletar": 4,
        "imagen": "http://localhost:5000/uploads/curl-biceps-alterno-con-mancuernas.gif" // Agregar URL de la imagen
    },
    {
        "codigo": "EJ020",
        "nombre": "Jumping Jacks",
        "descripcion": "Ejercicio para mejorar la resistencia y quemar calorías.",
        "nivel": "Principiante",
        "categoria": "Cardio",
        "series": 4,
        "duracion": 20,
        "descanso": 10,
        "repeticiones": 10,
        "estado": "En proceso",
        "seriesCompletar": 4,
        "imagen": "http://localhost:5000/uploads/Jumpingjacks.gif" // Agregar URL de la imagen
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
    }
};

export default seedEjercicios;