import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Button, ButtonLink, Card } from "../ui";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">{detalles.ejercicio.nombre}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteDetalleRutina(detalles.ejercicio._id)}>Delete</Button>
        </div>
      </header>
      <p className="text-slate-300">{detalles.ejercicio.descripcion}</p>
      <p className="text-slate-300">Categoría: {detalles.ejercicio.categoria}</p>
      <p className="text-slate-300">Duración: {detalles.duracion} minutos</p>
      <p className="text-slate-300">Series: {detalles.series}</p>
      <p className="text-slate-300">Repeticiones: {detalles.repeticiones}</p>
      <p className="text-slate-300">Orden: {detalles.orden}</p>
      {/* Formato de fecha */}
      <p>
        {detalles.createdAt &&
          new Date(detalles.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
    </Card>
  );
}