import { useEjercicios } from "../../context/ejercicioscontext";
import { Button, ButtonLink, Card } from "../ui";


export function EjercicioCard({ ejercicio }) {
  const { deleteEjercicio } = useEjercicios();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">EJERCICIO</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteEjercicio(ejercicio._id)}>Delete</Button>
          <ButtonLink to={`/ejercicio/${ejercicio._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-700">{ejercicio.nombre}</p>
      <p className="text-slate-700">{ejercicio.descripcion}</p>
      <p className="text-slate-700">{ejercicio.categoria}</p>
      <p className="text-slate-700">{ejercicio.duracion}</p>
      <p className="text-slate-700">{ejercicio.estado}</p>
      {/* format date */}
      <p>
        {ejercicio.date &&
          new Date(ejercicio.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
