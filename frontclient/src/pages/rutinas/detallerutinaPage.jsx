import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRutinaRequest } from '../../api/rutina';
import DetalleRutinaCard from '../../components/detallerutina/detallerutinaCard';
import '../../css/detallePage.css';

const DetallerutinaPage = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [rutina, setRutina] = useState(null);
  const [detalles, setDetalles] = useState([]);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <div className="text-black text-center">Cargando...</div>;

  return (
    <section className="detalle-seccion">
      <h2 className="text-black text-center display-4 font-weight-bold">{rutina.nombre}</h2>
      <p className="text-black text-center lead">{rutina.descripcion}</p>
      <h3 className="text-black mt-4 text-center">Ejercicios Asociados</h3>
      <div className="row seccion-card">
        {detalles.map(detalles => (
          <div className="col-md-4 mb-4" key={detalles._id}>
            <DetalleRutinaCard detalles={detalles} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetallerutinaPage;
