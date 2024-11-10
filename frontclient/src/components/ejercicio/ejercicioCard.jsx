import { useEjercicios } from "../../context/ejercicioscontext";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useAuth } from "../../context/authcontext";
import { Card } from "../ui";

export function EjercicioCard({ ejercicio }) {
  const { user } = useAuth();
  const { deleteEjercicio } = useEjercicios();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`/ejercicios/${user.nivel}`);
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
  const isRecommended = ejercicio.nivel === user.nivel;

  return (
    <Card className={`rounded-lg shadow-md ${isRecommended ? "bg-green-200" : "bg-red-200"} p-4`} style={{ width: "300px" }}>
      <header className="flex justify-between items-center mb-4">
        <h1
          className="text-white text-2xl font-bold text-center"
          title={!isRecommended ? "Este ejercicio no es recomendado para tu nivel." : ""}
        >
          {ejercicio.nombre}
        </h1>
        {isRecommended ? (
          <span className="text-white bg-green-800 px-2 py-1 rounded-lg text-sm">
            Recomendado
          </span>
        ) : (
          <span className="text-white bg-red-800 px-2 py-1 rounded-lg text-sm">
            No recomendado
          </span>
        )}
      </header>
      <hr />
      <p className="text-gray-300">Descripción: {ejercicio.descripcion}</p>
      <p className="text-gray-300">Nivel: {ejercicio.nivel}</p>
      <p className="text-gray-300">Categoría: {ejercicio.categoria}</p>
      <hr />
      <p className="text-gray-300">Series: {ejercicio.series}</p>
      <p className="text-gray-300">Repeticiones: {ejercicio.repeticiones}</p>
      <p className="text-gray-300">Duración: {ejercicio.duracion} segundos</p>
      <p className="text-gray-300">Descanso: {ejercicio.descanso} segundos</p>
      {ejercicio.imagen && (
        <div className="w-full flex justify-center my-4">
          <img src={ejercicio.imagen} alt={ejercicio.nombre} className="object-cover rounded-lg" style={{ width: "350px", height: "250px" }} />
        </div>
      )}
      <footer>
        <div className="flex gap-x-2 items-center">
          {/* Uncomment the buttons below if needed */}
          {/*<button className="btn btn-primary" onClick={() => deleteEjercicio(ejercicio._id)}>Eliminar</button>*/}
          {/*<button className="btn btn-primary" onClick={() => navigate(`/ejercicio/${ejercicio._id}`)}>Editar Ejercicio</button>*/}
        </div>
      </footer>
    </Card>
  );
}
