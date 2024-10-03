import React from 'react';
import '../../css/progresoPage.css';

function ProgresoPage() {
  return (
    <div className="progreso-page-container">
      <h2>Progreso de Rutinas</h2>
      <div className="progress-bar-container">
        <span className="progress-label">Ejercicio 1</span>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
      {/* Puedes agregar más barras de progreso para cada ejercicio */}
    </div>
  );
}

export default ProgresoPage;

/*
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
          <Timer duration={40} onComplete={handleSessionComplete} />
        </>
      ))}
    </>
  );
};

export default ProgresoPage;

*/