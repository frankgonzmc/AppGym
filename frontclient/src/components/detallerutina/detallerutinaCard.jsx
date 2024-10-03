import { useState, useEffect } from "react";
import { Card } from "../ui";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";

export function RutinaCard({ rutina }) {
  // Asegurarte de que rutina existe y tiene las propiedades necesarias, o usar valores predeterminados
  const duracionInicial = rutina?.duracion || 0; // Si rutina.duracion no está definido, usar 0
  const seriesInicial = rutina?.series || 0;
  const descansoInicial = rutina?.descanso || 0;

  const [seriesActual, setSeriesActual] = useState(0);
  const [duracionRestante, setDuracionRestante] = useState(duracionInicial); // Usar el valor inicial aquí
  const [descansoRestante, setDescansoRestante] = useState(descansoInicial);
  const [enDescanso, setEnDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);
  const [progreso, setProgreso] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (seriesActual >= seriesInicial) {
      setEjercicioCompletado(true);
      return;
    }

    if (!enDescanso && duracionRestante > 0) {
      interval = setInterval(() => {
        setDuracionRestante((prev) => prev - 1);
      }, 1000);
    } else if (enDescanso && descansoRestante > 0) {
      interval = setInterval(() => {
        setDescansoRestante((prev) => prev - 1);
      }, 1000);
    } else if (duracionRestante === 0 && !enDescanso) {
      setEnDescanso(true);
      setDescansoRestante(descansoInicial);
    } else if (descansoRestante === 0 && enDescanso) {
      setEnDescanso(false);
      setDuracionRestante(duracionInicial);
      setSeriesActual((prev) => prev + 1);
      setProgreso(((seriesActual + 1) / seriesInicial) * 100);
    }

    return () => clearInterval(interval);
  }, [
    duracionRestante,
    descansoRestante,
    enDescanso,
    seriesActual,
    seriesInicial,
    duracionInicial,
    descansoInicial,
  ]);

  const resetEjercicio = () => {
    if (ejercicioCompletado) {
      setSeriesActual(0);
      setDuracionRestante(duracionInicial);
      setDescansoRestante(descansoInicial);
      setEnDescanso(false);
      setEjercicioCompletado(false);
      setProgreso(0);
    }
  };

  return (
    <Card
      style={{
        borderColor: ejercicioCompletado ? "green" : "gray",
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">
          {rutina?.nombre || "Nombre de Rutina no disponible"}
        </h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina?.descripcion || "Descripción no disponible"}</p>
      <p className="text-slate-300">
        {rutina?.date &&
          new Date(rutina.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <hr className="text-slate-300" />

      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={progreso} label={`${Math.round(progreso)}%`} />
        {progreso === 100 && (
          <p className="text-green-500 mt-2">¡Rutina Completada!</p>
        )}
      </div>

      <div className="my-3">
        {!enDescanso ? (
          <p className="text-slate-300">Duración restante: {duracionRestante}s</p>
        ) : (
          <p className="text-slate-300">Descanso restante: {descansoRestante}s</p>
        )}
        <p className="text-slate-300">Series completadas: {seriesActual}/{seriesInicial}</p>
      </div>

      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina?._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina?._id}`)}>Ver Detalles</button>
          <button
            className="btn btn-secondary"
            onClick={resetEjercicio}
            disabled={!ejercicioCompletado}
          >
            Reset
          </button>
        </div>
      </footer>
    </Card>
  );
}
