import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "../ui";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

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
      <p className="text-slate-300">
        {detalles.createdAt &&
          new Date(detalles.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <hr className="text-slate-300" />
      <footer>
        <div className="flex gap-x-2 items-center">
          <button className="btn btn-primary" onClick={() => deleteDetalleRutina(detalles.ejercicio._id)}>Delete</button>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/inicar-ejercicios`, { state: { detalles } })} // Asegúrate de pasar detalles aquí
          >
            Iniciar Ejercicio
          </button>
        </div>
      </footer>
    </Card>
  );
}
