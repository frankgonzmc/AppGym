import { useAuth } from "../context/authcontext";
import { useState, useEffect } from "react";
import axios from "axios";
import '../css/panelElements.css';

export function PanelEjercicios() {

    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const fetchExercises = async () => {
        try {
            const response = await axios.get(`/api/ejercicios/${user.nivel}`);
            setExercises(response.data);
        } catch (error) {
            console.error("Error al obtener los ejercicios", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (user?.nivel) {
            fetchExercises();
        }
    }, [user]);

    useEffect(() => {
        if (exercises.length > 0) {
            const interval = setInterval(() => {
                setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [exercises]);

    if (exercises.length === 0) {
        return <p>No hay ejercicios disponibles para tu nivel.</p>;
    }

    const currentExercise = exercises[currentExerciseIndex];


    return (
        <div className="panel-ejercicios">
            <section className="bg-gray-800 p-12 rounded-md shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Recomendaciones de Ejercicios</h2>
                <p className="text-gray-400 mb-4">
                    Basado en tu nivel actual: <span className="font-semibold">{user.nivel}</span>
                </p>
                <div className="bg-gray-700 p-4 rounded-md">
                    <h3 className="text-2xl font-bold mb-4">{currentExercise?.nombre || "Nombre no disponible"}</h3>
                    <p className="text-white mb-2">Descripción: {currentExercise?.descripcion || "Descripción no disponible"}</p>
                    <p className="text-white mb-2">Nivel: {currentExercise?.nivel || "Nivel no disponible"}</p>
                    <p className="text-white mb-2">Categoría: {currentExercise?.categoria || "Categoría no disponible"}</p>
                    <p className="text-white mb-2">Series: {currentExercise?.series || "N/A"}</p>
                    <p className="text-white mb-2">Duración: {currentExercise?.duracion || "N/A"} segundos</p>
                    <p className="text-white mb-2">Descanso: {currentExercise?.descanso || "N/A"} segundos</p>
                    <p className="text-white mb-2">Repeticiones: {currentExercise?.repeticiones || "N/A"}</p>
                    <img src={currentExercise?.imagen} alt={currentExercise?.nombre} className="w-full h-48 object-cover mt-4 rounded-md" />
                </div>
            </section>
        </div>
    )
}