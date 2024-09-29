import { useEjercicios } from "../../context/ejercicioscontext";
import { Button, ButtonLink, Card } from "../ui";


export function EjercicioCard({ ejercicio }) {
  const { deleteEjercicio } = useEjercicios();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">{ejercicio.nombre}</h1>
      </header>
      <hr />
      <p className="text-slate-300">Descripción: {ejercicio.descripcion}</p>
      <p className="text-slate-300">Nivel: {ejercicio.nivel}</p>
      <p className="text-slate-300">Categoria: {ejercicio.categoria}</p>
      <hr />
      <p className="text-slate-300">Series: {ejercicio.series}</p>
      <p className="text-slate-300">Repeticiones: {ejercicio.repeticiones}</p>
      <p className="text-slate-300">Duración: {ejercicio.duracion} segundos</p>
      <p className="text-slate-300">Descanso: {ejercicio.descanso} segundos</p>
      {ejercicio.imagen && (
        <img src={ejercicio.imagen} alt={ejercicio.nombre} className="w-full h-auto" />
      )}
      <p>
        {ejercicio.date &&
          new Date(ejercicio.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <hr />
      <footer>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteEjercicio(ejercicio._id)}>Delete</Button>
          <ButtonLink to={`/ejercicio/${ejercicio._id}`}>Edit</ButtonLink>
        </div>
      </footer>
    </Card>
  );
}