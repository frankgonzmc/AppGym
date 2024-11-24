import { Card } from "../ui";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { useRutinas } from "../../context/rutinascontext";
import { useEffect, useState } from "react";

export function RutinaCard({ rutina }) {
  const navigate = useNavigate();
  const { deleteRutina } = useRutinas();

  // Estado para sincronizar el progreso
  const [totalEjercicios, setTotalEjercicios] = useState(rutina?.totalEjercicios || 0);
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState(rutina?.ejerciciosCompletados || 0);

  // Actualiza el estado si `rutina` cambia
  useEffect(() => {
    if (rutina) {
      setTotalEjercicios(rutina.totalEjercicios || 0);
      setEjerciciosCompletados(rutina.ejerciciosCompletados || 0);
    }
  }, [rutina]);

  // Calcular progreso
  const porcentajeProgreso = totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0;
  const estadoRutina = porcentajeProgreso === 100 ? "Completado" : "Pendiente";

  // Confirmación antes de eliminar la rutina
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta rutina?");
    if (confirmDelete) {
      try {
        await deleteRutina(rutina._id);
        alert("Rutina eliminada exitosamente.");
      } catch (error) {
        console.error("Error al eliminar rutina:", error);
        alert("Hubo un error al intentar eliminar la rutina.");
      }
    }
  };

  return (
    <Card>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina?.nombre || "Sin Nombre"}</h1>
        {estadoRutina === "Completado" && (
          <span className="bg-green-500 text-white px-2 py-1 rounded">Completado</span>
        )}
      </header>

      <hr className="text-slate-300" />

      <p className="text-slate-300">
        <strong>Descripción:</strong> {rutina?.descripcion || "No se proporcionó descripción"}
      </p>

      <div className="my-3">
        <p className="text-slate-300"><strong>Progreso de la rutina:</strong></p>
        <ProgressBar now={porcentajeProgreso} label={`${Math.round(porcentajeProgreso)}%`} />
        {porcentajeProgreso === 100 && (
          <p className="text-green-500 mt-2">¡Felicidades! Has completado esta rutina.</p>
        )}
      </div>

      <p className="text-slate-300">
        <strong>Ejercicios Completados:</strong> {ejerciciosCompletados} / {totalEjercicios}
      </p>
      <p className="text-slate-300">
        <strong>Estado:</strong> {estadoRutina}
      </p>

      <footer className="mt-4">
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>
            Editar
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>
            Ver Ejercicios
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      </footer>
    </Card>
  );
}