import { useState, useEffect } from "react";
import { Card } from "../ui";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap"; // Importamos el ProgressBar de react-bootstrap

export function RutinaCard({ rutina }) {
  const [seriesActual, setSeriesActual] = useState(0);
  const [duracionRestante, setDuracionRestante] = useState(rutina.duracion); // Duración del ejercicio
  const [descansoRestante, setDescansoRestante] = useState(rutina.descanso); // Descanso entre series
  const [enDescanso, setEnDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false); // Estado del ejercicio
  const [progreso, setProgreso] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    
    // Verificar si el ejercicio se completó
    if (seriesActual >= rutina.series) {
      setEjercicioCompletado(true); // Marcar como completado
      return; // Detener el temporizador
    }

    if (!enDescanso && duracionRestante > 0) {
      // Descuento de duración del ejercicio
      interval = setInterval(() => {
        setDuracionRestante((prev) => prev - 1);
      }, 1000);
    } else if (enDescanso && descansoRestante > 0) {
      // Descuento del descanso
      interval = setInterval(() => {
        setDescansoRestante((prev) => prev - 1);
      }, 1000);
    } else if (duracionRestante === 0 && !enDescanso) {
      // Si la duración del ejercicio llegó a 0, iniciar descanso
      setEnDescanso(true);
      setDescansoRestante(rutina.descanso);
    } else if (descansoRestante === 0 && enDescanso) {
      // Si el descanso terminó, reiniciar ejercicio y avanzar serie
      setEnDescanso(false);
      setDuracionRestante(rutina.duracion);
      setSeriesActual((prev) => prev + 1);
      setProgreso(((seriesActual + 1) / rutina.series) * 100); // Actualizar progreso
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [duracionRestante, descansoRestante, enDescanso, seriesActual, rutina.series, rutina.duracion, rutina.descanso]);

  // Función para resetear el ejercicio cuando está completado
  const resetEjercicio = () => {
    if (ejercicioCompletado) {
      setSeriesActual(0);
      setDuracionRestante(rutina.duracion);
      setDescansoRestante(rutina.descanso);
      setEnDescanso(false);
      setEjercicioCompletado(false);
      setProgreso(0);
    }
  };

  return (
    <Card
      style={{
        borderColor: ejercicioCompletado ? "green" : "gray", // Cambia el borde a verde cuando esté completado
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">
          {rutina.nombre}
        </h1>
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>
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

      {/* Barra de progreso */}
      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={progreso} label={`${Math.round(progreso)}%`} />
        {progreso === 100 && (
          <p className="text-green-500 mt-2">¡Rutina Completada!</p>
        )}
      </div>

      <div className="my-3">
        {/* Mostrar duración o descanso */}
        {!enDescanso ? (
          <p className="text-slate-300">Duración restante: {duracionRestante}s</p>
        ) : (
          <p className="text-slate-300">Descanso restante: {descansoRestante}s</p>
        )}
        <p className="text-slate-300">Series completadas: {seriesActual}/{rutina.series}</p>
      </div>

      <footer>
        <div className="flex gap-x-3 items-center">
          {/* Botones de acciones */}
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
          {/* Botón de reinicio (solo habilitado si el ejercicio está completado) */}
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
