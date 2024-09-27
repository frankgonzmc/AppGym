import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRutinaRequest } from '../api/rutina'; // Asegúrate de que esta función esté definida
import EjercicioCard from '../components/detallerutina/detallerutinaCard'; // Importa tu componente EjercicioCard


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

  return <h4>Tiempo restante: {timeLeft} segundos</h4>;
};

// Asegúrate de pasar un duration a Timer
<Timer duration={30} onComplete={handleSessionComplete} />


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

  const handleSessionComplete = () => {
    console.log('Sesión completada');
    // Aquí puedes actualizar el estado del ejercicio a "Completado"
  };

  return (
    // ... código existente ...
    <>
      {detalles.map(detalle => (
        <>
          <EjercicioCard key={detalle._id} detalle={detalle} />
          {/* Agregar temporizador para cada ejercicio */}
          <Timer duration={40} onComplete={handleSessionComplete} /> {/* Temporizador de 40 segundos */}
        </>
      ))}
    </>
  );
};

export default ProgresoPage;