import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { useProgreso } from "../../context/progresocontext"; // Importamos el contexto de progreso
import { Card } from "../ui";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const { updateProgreso } = useProgreso(); // Importamos la función para actualizar progreso
  const navigate = useNavigate();

  const handleCompleteEjercicio = async () => {
    try {
      await updateProgreso(detalles.rutina._id, detalles.ejercicio._id, true); // Actualizamos el progreso
      alert('¡Ejercicio completado!');
    } catch (error) {
      console.error('Error actualizando progreso:', error);
    }
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
      <footer>
        <div className="flex gap-x-2 items-center">
          <button className="btn btn-primary" onClick={handleCompleteEjercicio}>
            Completar Ejercicio
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/iniciar-ejercicios`, { state: { detalles } })}>
            Iniciar Ejercicio
          </button>
          <p className='flex justify-between text-2xl text-slate-300 font-bold'>Estado: {detalles.estado}</p>
        </div>
      </footer>
    </Card>
  );
}
