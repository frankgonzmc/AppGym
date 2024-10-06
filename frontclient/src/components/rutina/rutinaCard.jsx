import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { useProgreso } from "../../context/progresocontext";
import { useEffect, useState } from "react";

export function RutinaCard({ rutina }) {
  const navigate = useNavigate();
  const { progreso, getProgreso } = useProgreso(); // Asegúrate de que getProgreso está disponible
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState(0);

  useEffect(() => {
    // Función para actualizar el progreso
    const actualizarProgreso = async () => {
      await getProgreso(rutina._id); // Obtiene el progreso actualizado
      const ejerciciosCompletados = progreso[rutina._id]?.ejerciciosCompletados || 0;
      setEjerciciosCompletados(ejerciciosCompletados);
    };

    // Ejecutar la función al montar el componente
    actualizarProgreso();

    // Configurar el intervalo para actualizar cada 5 segundos
    const interval = setInterval(() => {
      actualizarProgreso();
    }, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [rutina._id, progreso, getProgreso]); // Agregar dependencias necesarias

  const totalEjercicios = rutina.totalEjercicios || 0;
  const porcentajeProgreso = totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0;

  // Actualizar el estado de la rutina basado en el progreso
  const estadoRutina = rutina.estado || 'Pendiente'; // Asegúrate de que el estado se esté pasando correctamente

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>

      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={porcentajeProgreso} label={`${Math.round(porcentajeProgreso)}%`} />
        {porcentajeProgreso === 100 && <p className="text-green-500 mt-2">¡Rutina Completada!</p>}
      </div>

      <p className="text-slate-300">Ejercicios Completados: {ejerciciosCompletados} / {totalEjercicios}</p>
      <p className="text-slate-300">Estado: {estadoRutina}</p>
      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
        </div>
      </footer>
    </Card>
  );
}
