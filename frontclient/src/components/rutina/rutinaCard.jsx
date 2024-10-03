import { useRutinas } from "../../context/rutinascontext";
import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'; // Importamos el ProgressBar de react-bootstrap

export function RutinaCard({ rutina }) {
  const { deleteRutina } = useRutinas();
  const navigate = useNavigate();

  // Calcular progreso basado en ejercicios completados
  const ejerciciosCompletados = rutina.ejercicios.filter(e => e.estado === 'Completado').length;
  const totalEjercicios = rutina.ejercicios.length;
  const progreso = (ejerciciosCompletados / totalEjercicios) * 100;

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>

      {/* Formatear la fecha */}
      <p className="text-slate-300">
        {rutina.date &&
          new Date(rutina.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>

      <hr className="text-slate-300" />

      {/* Barra de progreso */}
      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={progreso} label={`${Math.round(progreso)}%`} />
        {progreso === 100 && <p className="text-green-500 mt-2">¡Rutina Completada!</p>}
      </div>

      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
        </div>
      </footer>
    </Card>
  );
}
