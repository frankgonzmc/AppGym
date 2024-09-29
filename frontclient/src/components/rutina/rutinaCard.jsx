import { useRutinas } from "../../context/rutinascontext";
import { Button, ButtonLink, Card } from "../ui";

export function RutinaCard({ rutina }) {
  const { deleteRutina } = useRutinas();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">RUTINAS</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteRutina(rutina._id)}>Delete</Button>
          <ButtonLink to={`/rutina/${rutina._id}`}>Edit</ButtonLink>
          <ButtonLink to={`/detalles-rutinas/${rutina._id}`}>Ver Detalles</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{rutina.nombre}</p>
      <p className="text-slate-300">{rutina.descripcion}</p>
      {/* format date */}
      <p>
        {rutina.date &&
          new Date(rutina.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}
