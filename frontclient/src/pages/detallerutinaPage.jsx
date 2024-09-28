import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRutinaRequest } from '../api/rutina'; // Asegúrate de que esta función esté definida
import EjercicioCard from '../components/detallerutina/detallerutinaCard'; // Importa tu componente EjercicioCard

const DetallerutinaPage = () => {
  const [loading] = useState(true);

  useEffect(() => {

  }, []);

  if (loading) return <div>Cargando...</div>;


  return (
    <div className="container mx-auto p-4">

    </div>
  );
};

export default DetallerutinaPage;


/*
  const { id } = useParams();
  const [rutina, setRutina] = useState(null);
  const [detalles, setDetalles] = useState([]);
  

  
    const fetchRutina = async () => {
      setLoading(true);
      try {
        const res = await getRutinaRequest(id);
        setRutina(res.data.rutina);
        setDetalles(res.data.detalles);
      } catch (error) {
        console.error('Error al obtener la rutina:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRutina();



<h2 className="text-3xl font-bold">{rutina.nombre}</h2>
<p className="text-lg">{rutina.descripcion}</p>
<h3 className="text-2xl mt-4">Ejercicios Asociados</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {detalles.map(detalle => (
    <EjercicioCard key={detalle._id} detalle={detalle} />
  ))}
</div>
*/