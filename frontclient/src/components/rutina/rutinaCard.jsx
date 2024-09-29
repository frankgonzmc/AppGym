import { useRutinas } from "../../context/rutinascontext";
import { Button, ButtonLink, Card } from "../ui";

export function RutinaCard({ rutina }) {
  const { deleteRutina } = useRutinas();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">{rutina.nombre}</h1>
      </header>
      <hr />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>
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
      <hr />
      <footer>
        <div className="flex gap-x-3 items-center">
          <Button onClick={() => deleteRutina(rutina._id)}>Delete</Button>
          <ButtonLink to={`/rutina/${rutina._id}`}>Edit</ButtonLink>
          <ButtonLink to={`/detalles-rutinas/${rutina._id}`}>Ver Detalles</ButtonLink>
        </div>
      </footer>
    </Card>
  );
}
