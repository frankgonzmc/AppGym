import { useRutinas } from "../../context/rutinascontext";
import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';

export function RutinaCard({ rutina }) {
  const { deleteRutina } = useRutinas();
  const navigate = useNavigate();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>
      {/* format date */}
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
      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
        </div>
      </footer>
    </Card>
  );
}