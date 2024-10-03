import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';

export default function DetalleRutinaCard({ detalles }) {
  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.ejercicio.seriesProgreso || 0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    // Cargar el progreso del usuario desde el almacenamiento local
    const progresoGuardado = JSON.parse(localStorage.getItem(`progreso_${detalles.ejercicio.codigo}`));
    if (progresoGuardado) {
      setDuracionRestante(progresoGuardado.duracionRestante || detalles.ejercicio.duracion);
      setDescansoRestante(progresoGuardado.descansoRestante || detalles.ejercicio.descanso);
      setSeriesCompletadas(progresoGuardado.seriesCompletadas || 0);
      setEjercicioCompletado(progresoGuardado.ejercicioCompletado || false);
    }
  }, [detalles.ejercicio.codigo]);

  useEffect(() => {
    localStorage.setItem(`progreso_${detalles.ejercicio.codigo}`, JSON.stringify({
      duracionRestante,
      descansoRestante,
      seriesCompletadas,
      ejercicioCompletado,
    }));
  }, [duracionRestante, descansoRestante, seriesCompletadas, ejercicioCompletado, detalles.ejercicio.codigo]);

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
              const nuevasSeriesCompletadas = prev + 1;
              // Verificar si se han completado todas las series
              if (nuevasSeriesCompletadas >= detalles.ejercicio.seriesCompletar) {
                clearInterval(intervalRef.current);
                setEjercicioCompletado(true);
                alert('¡Ejercicio completado!');
              }
              return nuevasSeriesCompletadas;
            });
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, detalles.ejercicio.duracion, detalles.ejercicio.descanso, detalles.ejercicio.seriesCompletar, ejercicioCompletado]);

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
    localStorage.removeItem(`progreso_${detalles.ejercicio.codigo}`); // Limpiar el progreso guardado
  };

  return (
    <Card
      style={{
        borderColor: ejercicioCompletado ? 'green' : 'gray',
        borderWidth: '12px',
        borderStyle: 'solid',
        padding: '25px',
      }}
    >
      <div className="exercise-card">
        <h1 className='text-2xl text-black font-bold text-center'>{detalles.ejercicio.nombre}</h1>
        <p>{detalles.ejercicio.descripcion}</p>
        <ProgressBar
          now={(duracionRestante / detalles.ejercicio.duracion) * 100}
          label={`${duracionRestante}s`}
        />
        {isDescanso && (
          <ProgressBar
            variant="info"
            now={(descansoRestante / detalles.ejercicio.descanso) * 100}
            label={`Descanso: ${descansoRestante}s`}
          />
        )}

        <p>Series completadas: {seriesCompletadas}/{detalles.ejercicio.seriesCompletar}</p>

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
