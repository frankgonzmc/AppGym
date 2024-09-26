import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRutinaRequest } from '../api/rutina'; // Asegúrate de que esta función esté definida
import EjercicioCard from '../components/ejercicio/ejercicioCard'; // Importa tu componente EjercicioCard

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onComplete]);

  return (
    <div>
      <h4>Tiempo restante: {timeLeft} segundos</h4>
    </div>
  );
};

const ProgresoPage = () => {
  const { id } = useParams(); // Obtener el ID de la rutina desde la URL
  const [rutina, setRutina] = useState(null);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
    const fetchRutina = async () => {
      try {
        const res = await getRutinaRequest(id);
        setRutina(res.rutina);
        setDetalles(res.detalles);
      } catch (error) {
        console.error('Error al obtener la rutina:', error);
      }
    };
    fetchRutina();
  }, [id]);

  if (!rutina) return <div>Cargando...</div>;

  const handleSessionComplete = (detalleId) => {
    console.log(`Sesión completada para el ejercicio con ID: ${detalleId}`);

    // Aquí puedes actualizar el estado del ejercicio a "Completado"
    // Por ejemplo, podrías hacer una llamada a tu API para actualizar el estado
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">{rutina.nombre}</h2>
      <p className="text-lg">{rutina.descripcion}</p>
      <h3 className="text-2xl mt-4">Ejercicios Asociados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {detalles.map(detalle => (
          <div key={detalle._id}>
            <EjercicioCard detalle={detalle} />
            {/* Agregar temporizador para cada ejercicio */}
            <Timer duration={40} onComplete={() => handleSessionComplete(detalle._id)} /> {/* Temporizador de 40 segundos */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgresoPage;