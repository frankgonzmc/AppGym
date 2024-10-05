import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'; // Importamos useLocation
import { useDetallesRutina } from '../../context/detallerutinacontext'; // Usamos el contexto de detalles de rutina
import { useProgreso } from '../../context/progresocontext'; 

export default function IniciarejercicioPage() {
  const { state } = useLocation(); 
  const { detalles } = state || {}; 

  if (!detalles) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const { updateProgresoEjercicio } = useProgreso(); 
  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.seriesCompletadas || 0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(detalles.ejercicioCompletado || false);

  const intervalRef = useRef(null);

  // Guardar el progreso del ejercicio
  useEffect(() => {
    if (detalles && detalles._id) {
      updateProgresoEjercicio(detalles.ejercicio._id.toString(), {
        rutinaId: detalles.rutinaId,
        seriesCompletadas,
      });
    }
  }, [seriesCompletadas]);

  // Temporizador y lógica de descanso
  // En el useEffect para el temporizador
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
              if (newSeries >= detalles.ejercicio.series) {
                clearInterval(intervalRef.current);
                setEjercicioCompletado(true);
                // Cambia alert por un estado que muestre un mensaje en pantalla
                return newSeries;
              }
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
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
