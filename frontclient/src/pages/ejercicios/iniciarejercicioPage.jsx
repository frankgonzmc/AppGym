/*
import { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import reposo from "../../imagenes/reposo.webp";
import { useAuth } from "../../context/authcontext";
import {
  getDetalleRutinaRequest,
  updateDetalleRutinaRequest,
} from '../../api/detallerutina';
import {
  updateRutinaProgressRequest,
  updateEstadoRutinaRequest,
  registrarRutinaCompletadoRequest,
} from '../../api/rutina';
import { updateProgresoRequest, updateEstadoProgresoRequest, getProgresoUsuarioRequest } from '../../api/progreso';

export default function IniciaEjercicioPage() {
  const { state } = useLocation();
  const { user } = useAuth();
  const { detalles } = state || {};

  if (!detalles || !detalles.ejercicio) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion || 0);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso || 0);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.seriesProgreso || 0);
  const [caloriasQuemadas, setCaloriasQuemadas] = useState(0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(seriesCompletadas === detalles.ejercicio.series);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const calcularCaloriasQuemadas = () => {
    const MET = 8; // MET para ejercicio moderado
    const pesoEnKg = user?.peso || 70; // Default: 70kg si el peso del usuario no está disponible
    const duracionEnHoras = (detalles.ejercicio.duracion * detalles.ejercicio.series) / 3600;

    return MET * pesoEnKg * duracionEnHoras;
  };

  useEffect(() => {
    setCaloriasQuemadas(calcularCaloriasQuemadas());
  }, [detalles]);

  const actualizarProgresoSerie = async (nuevasSeries) => {
    try {
      if (nuevasSeries <= detalles.ejercicio.series) {
        await updateDetalleRutinaRequest(detalles._id, { seriesProgreso: nuevasSeries });

        if (nuevasSeries === detalles.ejercicio.series) {
          setEjercicioCompletado(true);
          await actualizarDatosCompletos();
        }
      }
    } catch (error) {
      console.error("Error al actualizar progreso de la serie:", error);
    }
  };

  const actualizarDatosCompletos = async () => {
    try {
      setLoading(true);
      await updateDetalleRutinaRequest(detalles._id, { estado: "Completado" });

      const response = await getDetalleRutinaRequest(detalles.rutina);
      const detallesRutina = response?.data?.detalles || [];
      const ejerciciosCompletos = detallesRutina.filter((detalle) => detalle.estado === "Completado").length;

      await updateRutinaProgressRequest(detalles.rutina, ejerciciosCompletos);

      if (ejerciciosCompletos >= detallesRutina.length) {
        await updateEstadoRutinaRequest(detalles.rutina, "Completado");

        const progreso = await getProgresoUsuarioRequest(user.id);
        if (progreso?.data?._id) {
          await updateProgresoRequest(progreso.data._id, {
            ejerciciosCompletados: ejerciciosCompletos,
            caloriasQuemadas: calcularCaloriasQuemadas(),
            fechaFin: new Date(),
          });
        }
      }
    } catch (error) {
      console.error("Error al actualizar datos completos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isPausado && !ejercicioCompletado) {
      intervalRef.current = setInterval(() => {
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
            actualizarProgresoSerie(nuevasSeries);
          }
        }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, ejercicioCompletado]);

  const handlePausarReanudar = () => {
    setIsPausado((prev) => !prev);
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
    <section className="text-center text-black seccion">
      <Card>
        <Card.Header>
          <h1 className="text-center text-2xl text-black font-bold">{detalles.ejercicio.nombre}</h1>
          <div className="flex h-[calc(80vh-80px)] items-center justify-center">
            {isDescanso ? (
              <img src={reposo} alt="Descanso" className="w-450 h-450 mt-2 my-2" style={{ maxWidth: "100%", height: "auto" }} />
            ) : (
              detalles.ejercicio.imagen && (
                <img src={detalles.ejercicio.imagen} alt={detalles.ejercicio.nombre} className="w-450 h-450 mt-2 my-2" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              )
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <p className='text-black'>{detalles.ejercicio.descripcion}</p>
          <p className='text-black'><strong>Calorías Quemadas (estimado):</strong> {caloriasQuemadas.toFixed(2)} kcal</p>
          <ProgressBar
            now={(duracionRestante / detalles.ejercicio.duracion) * 100}
            label={`Duración: ${duracionRestante}s`}
            className="mt-2"
            style={{ height: "30px", width: "100%", maxWidth: "auto" }}
          />
          {isDescanso && (
            <ProgressBar
              variant="info"
              now={(descansoRestante / detalles.ejercicio.descanso) * 100}
              className="mt-2"
              label={`Descanso: ${descansoRestante}s`}
              style={{ height: "30px", width: "100%", maxWidth: "auto" }}
            />
          )}
          <p className='text-black'>Series completadas: {seriesCompletadas} / {detalles.ejercicio.series}</p>
          {loading && <p className="text-center text-slate-500">Actualizando datos...</p>}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePausarReanudar} disabled={ejercicioCompletado}>
              {isPausado ? "Iniciar" : "Pausar"}
            </Button>
            <Button variant="danger" onClick={handleReset} disabled={!ejercicioCompletado}>
              Reiniciar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}*/

import { useState, useEffect, useRef } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import '../../css/ejercicioPage.css';
import { useLocation } from 'react-router-dom';
import reposo from "../../imagenes/reposo.webp";
import { useAuth } from "../../context/authcontext";
import {
  getDetalleRutinaRequest,
  updateDetalleRutinaRequest,
} from '../../api/detallerutina';
import {
  updateRutinaProgressRequest,
  updateEstadoRutinaRequest,
  registrarRutinaCompletadoRequest,
} from '../../api/rutina';
import { updateProgresoRequest, updateEstadoProgresoRequest, getProgresoUsuarioRequest } from '../../api/progreso';


export default function IniciaEjercicioPage() {
  const { state } = useLocation();
  const { user } = useAuth();
  const { detalles } = state || {};

  if (!detalles || !detalles.ejercicio) {
    return <div>Error: No se han encontrado los detalles del ejercicio</div>;
  }

  const [duracionRestante, setDuracionRestante] = useState(detalles.ejercicio.duracion || 0);
  const [descansoRestante, setDescansoRestante] = useState(detalles.ejercicio.descanso || 0);
  const [seriesCompletadas, setSeriesCompletadas] = useState(detalles.seriesProgreso || 0);
  const [caloriasQuemadas, setCaloriasQuemadas] = useState(0);
  const [isPausado, setIsPausado] = useState(true);
  const [isDescanso, setIsDescanso] = useState(false);
  const [ejercicioCompletado, setEjercicioCompletado] = useState(seriesCompletadas === detalles.ejercicio.series);
  const intervalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const calcularCaloriasQuemadas = () => {
    const MET = 8; // MET para ejercicio moderado
    const pesoEnKg = user?.peso || 70; // Default: 70kg si el peso del usuario no está disponible
    const duracionEnHoras = (detalles.ejercicio.duracion * detalles.ejercicio.series) / 3600;

    return MET * pesoEnKg * duracionEnHoras;
  };

  useEffect(() => {
    setCaloriasQuemadas(calcularCaloriasQuemadas());
  }, [detalles]);

  const actualizarDatosCompletos = async () => {
    try {
      setLoading(true);

      if (!user || !user.id) {
        throw new Error("Usuario no autenticado o user._id es inválido.");
      }

      await updateDetalleRutinaRequest(detalles._id, { estado: "Completado" });

      const response = await getDetalleRutinaRequest(detalles.rutina);
      if (!response || !response.detalles) {
        throw new Error("La respuesta no contiene los detalles esperados.");
      }

      const detallesRutina = response.detalles;
      const ejerciciosCompletos = detallesRutina.filter((detalle) => detalle.estado === "Completado").length;

      const progreso = await getProgresoUsuarioRequest(user.id); // Obtener progreso del usuario

      await updateRutinaProgressRequest(detalles.rutina, ejerciciosCompletos);

      if (ejerciciosCompletos >= detallesRutina.length) {
        await updateEstadoRutinaRequest(detalles.rutina, "Completado");
        await updateDetalleRutinaRequest(detalles._id, {
          tiempoEstimado: detalles.ejercicio.duracion * detalles.ejercicio.series,
          caloriasQuemadas: calcularCaloriasQuemadas(), // Recalcular calorias
        });

        if (progreso) {
          // Asegúrate de enviar un string en `estado`
          await updateEstadoProgresoRequest(progreso.data._id, "Completado");

          await updateProgresoRequest(progreso.data._id, {
            ejerciciosCompletados: ejerciciosCompletos,
            tiempoTotal: detalles.ejercicio.duracion * detalles.ejercicio.series,
            caloriasQuemadas: calcularCaloriasQuemadas(),
            fechaFin: new Date(),
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const actualizarProgresoSerie = async (nuevasSeries) => {
    try {
      if (nuevasSeries <= detalles.ejercicio.series) {
        await updateDetalleRutinaRequest(detalles._id, { seriesProgreso: nuevasSeries });

        if (nuevasSeries === detalles.ejercicio.series) {
          setEjercicioCompletado(true);
          await actualizarDatosCompletos(); // Actualiza progreso general
        }
      }
    } catch (error) {
      console.error("Error al actualizar progreso de la serie:", error);
    }
  };

  useEffect(() => {
    if (!isPausado && !ejercicioCompletado) {
      intervalRef.current = setInterval(() => {
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
            actualizarProgresoSerie(nuevasSeries);
          }
        }
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPausado, duracionRestante, descansoRestante, isDescanso, seriesCompletadas, ejercicioCompletado]);

  const handlePausarReanudar = () => {
    setIsPausado((prev) => !prev);
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
    <section className="text-center text-black seccion">
      <Card>
        <Card.Header>
          <header>
            <h1 className="text-center text-2xl text-black font-bold">{detalles.ejercicio.nombre}</h1>
          </header>
          <hr className='text-black my-2' />
          <div className="flex h-[calc(80vh-80px)] items-center justify-center">
            {isDescanso ? (
              <img src={reposo} alt="Descanso" className="w-450 h-450 mt-2 my-2" style={{ maxWidth: "100%", height: "auto" }} />
            ) : (
              detalles.ejercicio.imagen && (
                <img src={detalles.ejercicio.imagen} alt={detalles.ejercicio.nombre} className="w-450 h-450 mt-2 my-2" style={{ maxWidth: "100%", maxHeight: "100%" }} />
              )
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <p className='text-black' >{detalles.ejercicio.descripcion}</p>
          <p className='text-black' ><strong>Calorías Quemadas (estimado):</strong> {caloriasQuemadas.toFixed(2)} kcal</p>
          <ProgressBar
            now={(duracionRestante / detalles.ejercicio.duracion) * 100}
            label={`Duración: ${duracionRestante}s`}
            className="mt-2"
            style={{ height: "30px", width: "100%", maxWidth: "auto" }}
          />
          {isDescanso && (
            <ProgressBar
              variant="info"
              now={(descansoRestante / detalles.ejercicio.descanso) * 100}
              className="mt-2"
              label={`Descanso: ${descansoRestante}s`}
              style={{ height: "30px", width: "100%", maxWidth: "auto" }}
            />
          )}
          <p className='text-black'>Series completadas: {seriesCompletadas} / {detalles.ejercicio.series}</p>
          {loading && <p className="text-center text-slate-500">Actualizando datos...</p>}
          <div className="d-flex justify-content-between">
            <Button onClick={handlePausarReanudar} disabled={ejercicioCompletado}>
              {isPausado ? "Iniciar" : "Pausar"}
            </Button>
            <Button variant="danger" onClick={handleReset} disabled={!ejercicioCompletado}>
              Reiniciar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
