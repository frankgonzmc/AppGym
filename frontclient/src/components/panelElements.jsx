import React, { useState, useEffect } from "react";
import calendar from "../imagenes/calendar.png";
import muscle from "../imagenes/muscle.png";
import control from "../imagenes/control.png";
import ai from "../imagenes/ai.png";
import tab from "../imagenes/tab.png";
import body from "../imagenes/body.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import axios from "axios";
import '../css/panelElements.css'; // Asegúrate de importar los estilos aquí

export function PanelElements() {
    const { user } = useAuth(); // Agregamos una función para obtener los ejercicios del usuario
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    // Función para obtener ejercicios por nivel
    const fetchExercises = async () => {
        try {
            const response = await axios.get(`/api/ejercicios/${user.nivel}`);
            setExercises(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener los ejercicios", error);
        }
    };

    useEffect(() => {
        if (user?.nivel) {
            fetchExercises();
        }
    }, [user]);

    // Cambiar el ejercicio mostrado cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentExerciseIndex((prevIndex) => (prevIndex + 1) % exercises.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [exercises]);

    if (!exercises.length) {
        return <p>No hay ejercicios disponibles para tu nivel.</p>;
    }

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div className="panel-container">
            {/* Sección 1: Panel de enlaces */}
            <div className="panel-elements">
                <Link to="/calendar">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={calendar} alt="calendar" className="paneles-img" />
                        </button>
                        <h2>Calendario</h2>
                    </div>
                </Link>
                <Link to="/rutinas">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={muscle} alt="Rutines" className="paneles-img" />
                        </button>
                        <h2>Mis Rutinas</h2>
                    </div>
                </Link>
                <Link to="/progreso">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={control} alt="Panel" className="paneles-img" />
                        </button>
                        <h2>Panel de Seguimiento</h2>
                    </div>
                </Link>
                <Link to="/historial">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={ai} alt="GetRutine" className="paneles-img" />
                        </button>
                        <h2>Historial Rutinas</h2>
                    </div>
                </Link>
                <Link to="/add-rutinas">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={tab} alt="AddRutine" className="paneles-img" />
                        </button>
                        <h2>Crear Rutina</h2>
                    </div>
                </Link>
                <Link to="/ejercicios">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={body} alt="Ejercicios" className="paneles-img" />
                        </button>
                        <h2>Ver Ejercicios</h2>
                    </div>
                </Link>
            </div>

            {/* Sección 2: Recomendaciones de ejercicios */}
            <div className="panel-ejercicios">
                <section className="bg-gray-800 p-12 rounded-md shadow-lg mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Recomendaciones de Ejercicios</h2>
                    <p className="text-gray-400 mb-4">
                        Basado en tu nivel actual: <span className="font-semibold">{user.nivel}</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-zinc-800 max-w-3xl w-full p-6 rounded-md flex space-x-6">
                            {/* Ejercicio Recomendado */}
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-6">Ejercicio Recomendado</h2>

                                <div className="bg-gray-700 p-4 rounded-md">
                                    <h3 className="text-2xl font-bold mb-4">{currentExercise.nombre}</h3>
                                    <p className="mb-2">Descripción: {currentExercise.descripcion}</p>
                                    <p className="mb-2">Categoría: {currentExercise.categoria}</p>
                                    <p className="mb-2">Series: {currentExercise.series}</p>
                                    <p className="mb-2">Duración: {currentExercise.duracion} segundos</p>
                                    <p className="mb-2">Descanso: {currentExercise.descanso} segundos</p>
                                    <p className="mb-2">Repeticiones: {currentExercise.repeticiones}</p>
                                    <img src={currentExercise.imagen} alt={currentExercise.nombre} className="w-full h-48 object-cover mt-4 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
