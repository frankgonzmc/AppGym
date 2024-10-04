/*import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useProgreso } from '../../context/progresocontext'; // Importamos el contexto de progreso
import { useLocation } from 'react-router-dom'; // Importamos useLocation

export default function IniciarejercicioPage() {
  const { state } = useLocation(); // Usamos useLocation para acceder a los datos pasados por navigate
  const { detalles } = state || {}; // Obtenemos detalles del ejercicio de la navegación

  // Si no hay detalles (caso de acceder directamente a la URL sin haber pasado datos):
  if (!detalles) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const { updateProgresoEjercicio } = useProgreso(); // Usamos la función para actualizar progreso
  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.ejercicio.seriesProgreso || 0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);

  const intervalRef = useRef(null);

  // Guardar el progreso del ejercicio
  useEffect(() => {
    if (seriesCompletadas > 0) {
      updateProgresoEjercicio(detalles.ejercicio._id, {
        seriesCompletadas,
        ejercicioCompletado,
      });
    }
  }, [seriesCompletadas, ejercicioCompletado, updateProgresoEjercicio, detalles.ejercicio._id]);

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
            setSeriesCompletadas(prev => prev + 1);
            if (seriesCompletadas + 1 >= detalles.ejercicio.seriesCompletar) {
              clearInterval(intervalRef.current);
              setEjercicioCompletado(true);
              alert('¡Ejercicio completado!');
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, ejercicioCompletado]);

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
        <h1 className='text-2xl text-black font-bold text-center'>{detalles.ejercicio.nombre}</h1>
        <p>{detalles.ejercicio.descripcion}</p>
        <ProgressBar now={(duracionRestante / detalles.ejercicio.duracion) * 100} label={`${duracionRestante}s`} />
        {isDescanso && (
          <ProgressBar variant="info" now={(descansoRestante / detalles.ejercicio.descanso) * 100} label={`Descanso: ${descansoRestante}s`} />
        )}
        <p>Series completadas: {seriesCompletadas}/{detalles.ejercicio.seriesCompletar}</p>

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
*/

import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useProgreso } from '../../context/progresocontext'; // Importamos el contexto de progreso

export default function IniciarejercicioPage({ location }) {
  const { updateProgresoEjercicio } = useProgreso(); // Usamos la función para actualizar progreso
  const detalles = location.state?.detalles; // Usa optional chaining
  
  // Si no hay detalles (caso de acceder directamente a la URL sin haber pasado datos):
  if (!detalles) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }


  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.ejercicio.seriesProgreso || 0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);

  const intervalRef = useRef(null);

  // Guardar el progreso del ejercicio
  useEffect(() => {
    // Solo actualiza el progreso si hay cambios en seriesCompletadas o ejercicioCompletado
    if (seriesCompletadas > 0 || ejercicioCompletado) {
      updateProgresoEjercicio(detalles.ejercicio._id, {
        seriesCompletadas,
        ejercicioCompletado,
      });
    }
  }, [seriesCompletadas, ejercicioCompletado, updateProgresoEjercicio, detalles.ejercicio._id]);

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
            setSeriesCompletadas(prev => prev + 1); // Esto debería estar controlado
            if (seriesCompletadas + 1 >= detalles.ejercicio.seriesCompletar) {
              clearInterval(intervalRef.current);
              setEjercicioCompletado(true);
              alert('¡Ejercicio completado!');
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, ejercicioCompletado, detalles.ejercicio.duracion]);

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
        <h1 className='text-2xl text-black font-bold text-center'>{detalles.ejercicio.nombre}</h1>
        <p>{detalles.ejercicio.descripcion}</p>
        <ProgressBar now={(duracionRestante / detalles.ejercicio.duracion) * 100} label={`${duracionRestante}s`} />
        {isDescanso && (
          <ProgressBar variant="info" now={(descansoRestante / detalles.ejercicio.descanso) * 100} label={`Descanso: ${descansoRestante}s`} />
        )}
        <p>Series completadas: {seriesCompletadas}/{detalles.ejercicio.seriesCompletar}</p>

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
