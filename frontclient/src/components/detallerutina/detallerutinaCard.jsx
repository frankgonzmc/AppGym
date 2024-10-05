import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "../ui";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      console.log("ID a eliminar:", detalles.ejercicio._id); // Verificar el ID
      await deleteDetalleRutina(detalles.ejercicio._id);
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
      alert("Error al eliminar el ejercicio. Intenta nuevamente.");
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
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-success" onClick={() => navigate(`/iniciar-ejercicios`, { state: { detalles } })}>
            Iniciar Ejercicio
          </button>
          <p className='text-slate-300 font-bold'>Estado: {detalles.estado}</p>
        </div>
      </footer>
    </Card>
  );
}
