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
import '../css/panelElements.css';

export function PanelElements() {
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
        <div className="panel-container">
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
                            <img src={muscle} alt="Rutinas" className="paneles-img" />
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
                            <img src={ai} alt="Historial" className="paneles-img" />
                        </button>
                        <h2>Historial Rutinas</h2>
                    </div>
                </Link>
                <Link to="/add-rutinas">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={tab} alt="Añadir Rutina" className="paneles-img" />
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
        </div>
    );
}
