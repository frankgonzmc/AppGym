import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import { useProgreso } from "../../context/progresocontext";
import { useEffect, useState } from "react";
import { getDetallesRutina } from "../../api/detallerutina";

export function RutinaCard({ rutina }) {
  const navigate = useNavigate();
  const { progreso } = useProgreso();
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState(0);
  const [totalEjercicios, setTotalEjercicios] = useState(rutina.totalEjercicios || 0);
  const porcentajeProgreso = totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0;
  const estadoRutina = porcentajeProgreso === 100 ? 'Completado' : 'Pendiente';

  useEffect(() => {
    const progresoRutina = progreso[rutina._id];
    if (progresoRutina) {
      setEjerciciosCompletados(progresoRutina.ejerciciosCompletados || 0);
    }
  }, [progreso[rutina._id]]); // Cambiar la dependencia

  // Efecto para actualizar el total de ejercicios cuando la rutina cambie
  useEffect(() => {
    setTotalEjercicios(rutina.totalEjercicios || 0);
  }, [rutina.totalEjercicios]);

  // Nueva función para verificar el progreso de los ejercicios
  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const detalles = await getDetallesRutina(rutina._id); // Usa getDetallesRutina aquí

        // Verifica que detalles sea un array
        if (!Array.isArray(detalles)) {
          console.error("La respuesta de detalles no es un array:", detalles);
          return; // Salir si no es un array
        }

        // Filtrar los detalles de rutina que estén completos (4/4)
        const ejerciciosCompletos = detalles.filter(detalle =>
          detalle.seriesProgreso >= 4 && detalle.estado === 'Completado'
        );

        setEjerciciosCompletados(ejerciciosCompletos.length);
      } catch (error) {
        console.error("Error al obtener detalles de la rutina:", error);
      }
    };

    fetchDetalles();
  }, [rutina._id]); // Dependencia en el id de la rutina

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina.nombre}</h1>
        {ejerciciosCompletados === totalEjercicios && (
          <span className="bg-green-500 text-white px-2 py-1 rounded">Completado</span>
        )}
      </header>
      <hr className="text-slate-300" />
      <p className="text-slate-300">Descripción: {rutina.descripcion}</p>

      <div className="my-3">
        <p className="text-slate-300">Progreso de la rutina:</p>
        <ProgressBar now={porcentajeProgreso} label={`${Math.round(porcentajeProgreso)}%`} />
        {porcentajeProgreso === 100 && <p className="text-green-500 mt-2">¡Rutina Completada!</p>}
      </div>

      <p className="text-slate-300">Ejercicios Completados: {ejerciciosCompletados} / {totalEjercicios}</p>
      <p className="text-slate-300">Estado: {estadoRutina}</p>
      <footer>
        <div className="flex gap-x-3 items-center">
          <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Editar</button>
          <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Detalles</button>
        </div>
      </footer>
    </Card>
  );
}
