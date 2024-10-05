import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "../ui";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDetalleRutina(detalles._id); // Asegúrate de pasar el ID correcto
      // Tal vez quieras hacer algo adicional después de eliminar, como mostrar un mensaje
    } catch (error) {
      console.error("Error al eliminar el detalle:", error);
    }
  };

  const handleStartExercise = async () => {
    // Lógica para iniciar el ejercicio
    await updateProgresoEjercicio(detalles.rutina, detalles.ejercicio._id, 1); // Asumiendo que inicias con 1 serie
    navigate(`/iniciar-ejercicios`, { state: { detalles } });
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{detalles.ejercicio.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {detalles.ejercicio.descripcion}</p>
      <p className="text-slate-300">Categoría: {detalles.ejercicio.categoria}</p>
      <p className="text-slate-300">Duración: {detalles.ejercicio.duracion} segundos</p>
      <p className="text-slate-300">Series: {detalles.ejercicio.series}</p>
      <p className="text-slate-300">Repeticiones: {detalles.ejercicio.repeticiones}</p>
      <p className="text-slate-300">Descanso: {detalles.ejercicio.descanso}</p>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Series Completadas:{detalles.seriesProgreso} / {detalles.ejercicio.series}</p>
      <p className="text-slate-300">Estado: {detalles.estado}</p>
      <hr className="text-slate-300" />
      <footer>
        <div className="flex gap-x-2 items-center">
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-success" onClick={handleStartExercise}>
            Iniciar Ejercicio
          </button>
        </div>
      </footer>
    </Card>
  );
}
