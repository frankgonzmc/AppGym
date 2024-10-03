import { useEjercicios } from "../../context/ejercicioscontext";
import { useNavigate } from 'react-router-dom';
import { Button, ButtonLink, Card } from "../ui";


export function EjercicioCard({ ejercicio }) {
  const { deleteEjercicio } = useEjercicios();
  const navigate = useNavigate();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{ejercicio.nombre}</h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {ejercicio.descripcion}</p>
      <p className="text-slate-300">Nivel: {ejercicio.nivel}</p>
      <p className="text-slate-300">Categoria: {ejercicio.categoria}</p>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Series: {ejercicio.series}</p>
      <p className="text-slate-300">Repeticiones: {ejercicio.repeticiones}</p>
      <p className="text-slate-300">Duración: {ejercicio.duracion} segundos</p>
      <p className="text-slate-300">Descanso: {ejercicio.descanso} segundos</p>
      {ejercicio.imagen && (
        <img src={ejercicio.imagen} alt={ejercicio.nombre} className="w-full h-auto" />
      )}
      <p className="text-slate-300">
        {ejercicio.date &&
          new Date(ejercicio.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <footer>
        <div className="flex gap-x-2 items-center">
          <button className="btn btn-primary" onClick={() => deleteEjercicio(ejercicio._id)}>Delete</button>
          <button className="btn btn-primary" onClick={() => navigate(`/ejercicio/${ejercicio._id}`)}>Editar Ejercicio</button>
        </div>
      </footer>
    </Card>
  );
}