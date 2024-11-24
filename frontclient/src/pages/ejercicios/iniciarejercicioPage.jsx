import { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import reposo from "../../imagenes/reposo.webp";
import {
  updateProgresoEjercicioRequest,
  updateEstadoEjercicioRequest,
  getDetalleRutinaRequest
} from '../../api/detallerutina';
import { updateRutinaProgressRequest, updateEstadoRutinaRequest } from '../../api/rutina';
import { updateEstadoProgresoRequest } from '../../api/progreso';

export default function IniciaEjercicioPage() {
  const { state } = useLocation();
  const { detalles } = state || {};

  if (!detalles || !detalles.ejercicio) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion || 0);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso || 0);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.seriesProgreso || 0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(false);

  const intervalRef = useRef(null);

  const calcularCaloriasQuemadas = () => {
    const MET = 8; // MET para ejercicio moderado
    const pesoEnKg = detalles.peso || 70; // Peso del usuario (kg)
    const duracionEnHoras = (detalles.ejercicio.duracion * detalles.ejercicio.series) / 3600;
    return MET * pesoEnKg * duracionEnHoras;
  };

  const actualizarDatosCompletos = async () => {
    try {
      await updateEstadoEjercicioRequest(detalles._id, "Completado");

      const response = await getDetalleRutinaRequest(detalles.rutina);
      const detallesRutina = response.data.detalles;

      const ejerciciosCompletos = detallesRutina.filter(detalle => detalle.estado === 'Completado').length;
      await updateRutinaProgressRequest(detalles.rutina, ejerciciosCompletos);

      if (ejerciciosCompletos >= detallesRutina.length) {
        await updateEstadoRutinaRequest(detalles.rutina, "Completado");

        if (detalles.progresoId) {
          await updateEstadoProgresoRequest(detalles.progresoId, {
            ejerciciosCompletados: ejerciciosCompletos.length,
            estado: "Completado",
            estadoEjercicioCompletado: 1,
            fechaFin: new Date(),
            tiempoTotal: detalles.ejercicio.duracion * detalles.ejercicio.series,
            caloriasQuemadas: calcularCaloriasQuemadas()
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar los datos completos:", error);
    }
  };

  const actualizarProgresoSerie = async (nuevasSeries) => {
    try {
      if (nuevasSeries <= detalles.ejercicio.series) {
        await updateProgresoEjercicioRequest(detalles._id, nuevasSeries);

        if (nuevasSeries === detalles.ejercicio.series) {
          setEjercicioCompletado(true);
          await actualizarDatosCompletos();
        }
      }
    } catch (error) {
      console.error("Error al actualizar progreso de la serie:", error);
    }
  };

  useEffect(() => {
    if (!isPausado && !ejercicioCompletado) {
      intervalRef.current = setInterval(async () => {
        if (!isDescanso) {
          if (duracionRestante > 0) {
            setDuracionRestante((prev) => prev - 1);
          } else {
            setIsDescanso(true);
            setDescansoRestante(detalles.ejercicio.descanso);
          }
        } else {
          if (descansoRestante > 0) {
            setDescansoRestante((prev) => prev - 1);
          } else {
            setIsDescanso(false);
            setDuracionRestante(detalles.ejercicio.duracion);
            const nuevasSeries = seriesCompletadas + 1;
            setSeriesCompletadas(nuevasSeries);

            await actualizarProgresoSerie(nuevasSeries);
          }
        }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, ejercicioCompletado]);

  const handlePausarReanudar = () => {
    setIsPausado((prev) => !prev);
  };

  const handleReset = async () => {
    try {
      await updateProgresoEjercicioRequest(detalles._id, 0);
      await updateEstadoEjercicioRequest(detalles._id, "Pendiente");

      setDuracionRestante(detalles.ejercicio.duracion);
      setDescansoRestante(detalles.ejercicio.descanso);
      setSeriesCompletadas(0);
      setIsPausado(true);
      setIsDescanso(false);
      setEjercicioCompletado(false);
    } catch (error) {
      console.error("Error al reiniciar el ejercicio:", error);
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>
        <div className="flex h-[calc(80vh-80px)] items-center justify-center">
          {isDescanso ? (
            <img src={reposo} alt="Descanso" className="w-450 h-450 mt-2 my-2" style={{ maxWidth: '100%', height: 'auto' }} />
          ) : (
            detalles.ejercicio.imagen && (
              <img src={detalles.ejercicio.imagen} alt={detalles.ejercicio.nombre} className="w-450 h-450 mt-2 my-2" style={{ maxWidth: '100%', height: 'auto' }} />
            )
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <h1 className="text-2xl text-black font-bold">{detalles.ejercicio.nombre}</h1>
        <p>{detalles.ejercicio.descripcion}</p>
        <ProgressBar now={(duracionRestante / detalles.ejercicio.duracion) * 100} label={`Duración: ${duracionRestante}s`} className='mt-2' style={{ height: '40px', maxWidth: 'auto', }} />
        {isDescanso && (
          <ProgressBar variant="info" now={(descansoRestante / detalles.ejercicio.descanso) * 100} className='mt-2' label={`Descanso: ${descansoRestante}s`} style={{ height: '40px', maxWidth: 'auto', }} />
        )}
        <p>Series completadas: {seriesCompletadas} / {detalles.ejercicio.series}</p>

        <div className="d-flex justify-content-between">
          <Button onClick={handlePausarReanudar} disabled={ejercicioCompletado}>
            {isPausado ? 'Iniciar' : 'Pausar'}
          </Button>
          <Button variant="danger" onClick={handleReset} disabled={!ejercicioCompletado}>Reiniciar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
