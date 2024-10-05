import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDetallesRutina } from '../../context/detallerutinacontext';

export default function IniciaEjercicioPage() {
  const { state } = useLocation();
  const { detalles } = state || {};

  // Si no hay detalles:
  if (!detalles || !detalles.ejercicio) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const { updateProgresoEjercicio } = useDetallesRutina();
  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion || 0);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso || 0);
  const [seriesCompletadas, setSeriesCompletadas] = useState(0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);

  const intervalRef = useRef(null);

  // Actualizar progreso al iniciar el ejercicio
  useEffect(() => {
    if (!isPausado && !ejercicioCompletado) {
      updateProgresoEjercicio(detalles.ejercicio._id, {
        seriesCompletadas: seriesCompletadas,
        ejerciciosCompletados: ejercicioCompletado,
        ejercicio: detalles.ejercicio // Asegúrate de pasar el ejercicio completo
      });
    }
  }, [isPausado, ejercicioCompletado, seriesCompletadas, updateProgresoEjercicio, detalles]);

  // Temporizador y lógica de descanso
  useEffect(() => {
    if (!isPausado && !ejercicioCompletado) {
      intervalRef.current = setInterval(() => {
        if (!isDescanso) {
          if (duracionRestante > 0) {
            setDuracionRestante(prev => prev - 1);
          } else {
            setIsDescanso(true);
            setDescansoRestante(detalles.ejercicio.descanso);
          }
        } else {
          if (descansoRestante > 0) {
            setDescansoRestante(prev => prev - 1);
          } else {
            setIsDescanso(false);
            setDuracionRestante(detalles.ejercicio.duracion);
            setSeriesCompletadas(prev => {
              const newSeries = prev + 1;

              // Verificar si se ha completado el ejercicio
              if (newSeries >= detalles.ejercicio.series) {
                clearInterval(intervalRef.current);
                setEjercicioCompletado(true);

                // Enviar los datos actualizados de progreso
                updateProgresoEjercicio(detalles.ejercicio._id, {
                  seriesCompletadas: newSeries,
                  ejerciciosCompletados: 1,
                  ejercicio: detalles.ejercicio // Asegúrate de pasar el ejercicio completo
                });

                return newSeries;
              }

              // Enviar el progreso hasta el momento (antes de completar el ejercicio)
              updateProgresoEjercicio(detalles.ejercicio._id, {
                seriesCompletadas: newSeries,
                ejerciciosCompletados: 0,
                ejercicio: detalles.ejercicio // Asegúrate de pasar el ejercicio completo
              });

              return newSeries;
            });
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, detalles.ejercicio.series, ejercicioCompletado]);

  // Control de pausa y reset
  const handlePausarReanudar = () => {
    setIsPausado(prev => !prev);
  };

  const handleReset = () => {
    setDuracionRestante(detalles.ejercicio.duracion);
    setDescansoRestante(detalles.ejercicio.descanso);
    setSeriesCompletadas(0);
    setIsPausado(true);
    setIsDescanso(false);
    setEjercicioCompletado(false);
  };

  return (
    <Card>
      <div className="exercise-card">
        <div>
          {detalles.ejercicio.imagen && (
            <img src={detalles.ejercicio.imagen} alt={detalles.ejercicio.nombre} className="w-full h-auto" />
          )}
        </div>
        <h1 className='text-2xl text-black font-bold text-center'>{detalles.ejercicio.nombre}</h1>
        <p>{detalles.ejercicio.descripcion}</p>
        <ProgressBar now={(duracionRestante / detalles.ejercicio.duracion) * 100} label={`${duracionRestante}s`} />
        {isDescanso && (
          <ProgressBar variant="info" now={(descansoRestante / detalles.ejercicio.descanso) * 100} label={`Descanso: ${descansoRestante}s`} />
        )}
        <p>Series completadas: {seriesCompletadas}/{detalles.ejercicio.series}</p>

        <div className="d-flex justify-content-between">
          <Button onClick={handlePausarReanudar}>
            {isPausado ? 'Iniciar' : 'Pausar'}
          </Button>
          <Button variant="danger" onClick={handleReset} disabled={!ejercicioCompletado}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
