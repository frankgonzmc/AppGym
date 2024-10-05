import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap'; // Importamos el ProgressBar de react-bootstrap
import { useProgreso } from "../../context/progresocontext"; // Importamos el contexto de progreso

export function RutinaCard({ rutina }) {
  const navigate = useNavigate();
  const { progreso } = useProgreso(); // Obtenemos el progreso global

  // Calcular ejercicios completados basados en el progreso
  const ejerciciosCompletados = progreso[rutina._id]?.ejerciciosCompletados || 0;
  const totalEjercicios = rutina.totalEjercicios || 0; // Usamos el totalEjercicios del backend
  const porcentajeProgreso = totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0;

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>

      {/* Progreso de la rutina */}
      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={porcentajeProgreso} label={`${Math.round(porcentajeProgreso)}%`} />
        {porcentajeProgreso === 100 && <p className="text-green-500 mt-2">¡Rutina Completada!</p>}
      </div>

      <p className="text-slate-300">Ejercicios Completados: {ejerciciosCompletados} / {totalEjercicios}</p>

      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
        </div>
      </footer>
    </Card>
  );
}
