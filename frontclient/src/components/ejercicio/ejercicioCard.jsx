import { useEjercicios } from "../../context/ejercicioscontext";
import { Button, ButtonLink, Card } from "../ui";

export function EjercicioCard({ detalle }) {
  const { deleteEjercicio } = useEjercicios();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-center">EJERCICIO</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteEjercicio(detalle.ejercicio._id)}>Delete</Button>
          <ButtonLink to={`/ejercicio/${detalle.ejercicio._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300 font-semibold">{detalle.ejercicio.nombre}</p>
      <p className="text-slate-300">{detalle.ejercicio.descripcion}</p>
      <p className="text-slate-300">Categoría: {detalle.ejercicio.categoria}</p>
      <p className="text-slate-300">Duración: {detalle.duracion} segundos</p>
      <p className="text-slate-300">Series: {detalle.series}</p>
      <p className="text-slate-300">Repeticiones: {detalle.repeticiones}</p>
      <p className="text-slate-300">Estado: {detalle.estado || 'En Progreso'}</p> {/* Muestra el estado */}
    </Card>
  );
}