import React, { useState, useEffect, useRef } from 'react';
import { Button, ProgressBar } from 'react-bootstrap'; // Importar react-bootstrap

export default function DetalleRutinaCard({ detalles }) {
  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion); // Duración inicial
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso); // Descanso inicial
  const [seriesCompletadas, setSeriesCompletadas] = useState(0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPausado) {
      intervalRef.current = setInterval(() => {
        if (!isDescanso) {
          if (duracionRestante > 0) {
            setDuracionRestante(prev => prev - 1);
          } else {
            setIsDescanso(true);
            setDescansoRestante(detalles.ejercicio.descanso); // Reinicia el descanso
          }
        } else {
          if (descansoRestante > 0) {
            setDescansoRestante(prev => prev - 1);
          } else {
            setIsDescanso(false);
            setDuracionRestante(detalles.ejercicio.duracion); // Reinicia la duración
            setSeriesCompletadas(prev => prev + 1);
            if (seriesCompletadas + 1 === detalles.ejercicio.series) {
              clearInterval(intervalRef.current);
              alert('¡Ejercicio completado!');
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, detalles.ejercicio.duracion, detalles.ejercicio.descanso, detalles.ejercicio.series]);

  const handlePausarReanudar = () => {
    setIsPausado(prev => !prev);
  };

  const handleReset = () => {
    setDuracionRestante(detalles.ejercicio.duracion);
    setDescansoRestante(detalles.ejercicio.descanso);
    setSeriesCompletadas(0);
    setIsPausado(true);
    setIsDescanso(false);
  };

  return (
    <div className="exercise-card">
      <h1>{detalles.ejercicio.nombre}</h1>
      <p>{detalles.ejercicio.descripcion}</p>
      <ProgressBar now={(duracionRestante / detalles.ejercicio.duracion) * 100} label={`${duracionRestante}s`} />
      {isDescanso && <ProgressBar variant="info" now={(descansoRestante / detalles.ejercicio.descanso) * 100} label={`Descanso: ${descansoRestante}s`} />}

      <p>Series completadas: {seriesCompletadas}/{detalles.ejercicio.series}</p>

      <Button onClick={handlePausarReanudar}>
        {isPausado ? 'Iniciar' : 'Pausar'}
      </Button>
      <Button variant="danger" onClick={handleReset}>Reset</Button>
    </div>
  );
}
