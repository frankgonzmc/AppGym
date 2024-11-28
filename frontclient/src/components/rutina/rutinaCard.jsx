import { Card } from "../ui";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { useRutinas } from "../../context/rutinascontext";
import { useAuth } from "../../context/authcontext";
import { useEffect, useState } from "react";
import { showAlert, showConfirmation } from '../../components/alerts/utils-alerts';
import { updateRutinaRequest } from "../../api/rutina";

export function RutinaCard({ rutina }) {
  const navigate = useNavigate();
  const { deleteRutina } = useRutinas();
  const { user } = useAuth();

  // Estado para sincronizar el progreso
  const [loading, setLoading] = useState(false);
  const [totalEjercicios, setTotalEjercicios] = useState(rutina?.totalEjercicios || 0);
  const [ejerciciosCompletados, setEjerciciosCompletados] = useState(rutina?.ejerciciosCompletados || 0);

  const respuesta = totalEjercicios === ejerciciosCompletados ? 1 : 0;

  // Actualiza el estado si `rutina` cambia
  useEffect(() => {
    if (rutina) {
      setTotalEjercicios(rutina.totalEjercicios || 0);
      setEjerciciosCompletados(rutina.ejerciciosCompletados || 0);
    }
  }, [rutina]);

  // Calcular progreso
  const porcentajeProgreso = totalEjercicios > 0 ? (ejerciciosCompletados / totalEjercicios) * 100 : 0;
  const estadoRutina = porcentajeProgreso === 100 ? "Completo" : "Pendiente";

  // Confirmación antes de eliminar la rutina
  const handleDelete = async () => {

    const confirmed = await showConfirmation(
      '¿Estás seguro?',
      'Esta acción no se puede deshacer.',
      'warning'
    );

    if (confirmed) {
      setLoading(true); // Muestra el indicador de carga

      try {

        await updateRutinaRequest(rutina._id, { estadoRutinaRealizado: respuesta });  // Actualizar en el backend

        try {
          await deleteRutina(rutina._id);
          showAlert('¡Hecho!', 'Rutina Elimina Exitosamente.', 'success');
          navigate('/rutinas');
        } catch (error) {
          console.error("Error al eliminar rutina:", error);
          //alert("Hubo un error al intentar eliminar la rutina.");
        }
      } catch (error) {
        setMessage(error.response ? error.response.data.message : "Error en la solicitud");
      } finally {
        setLoading(false); // Ocultar carga
      }

      showAlert('¡Hecho!', 'Acción confirmada.', 'success');
      navigate('/rutinas');
    } else {
      showAlert('Cancelado', 'No se realizó ninguna acción.', 'info');
    }
  };

  return (
    <Card>
      <header className="flex justify-between items-center">
        <h1 className="text-2xl text-slate-300 font-bold text-center">{rutina?.nombre || "Sin Nombre"}</h1>
        {estadoRutina === "Completo" && (
          <span className="bg-green-500 text-white px-2 py-1 rounded">Completado</span>
        )}
      </header>

      <hr className="text-slate-300" />

      <p className="text-slate-300">
        <strong>Descripción:</strong> {rutina?.descripcion || "No se proporcionó descripción"}
        <br />
        <strong>Calorías Quemadas:</strong> {user.caloriasQuemadas || "0"} kcal
        <br />
        <strong>Tiempo Estimado:</strong> {user.tiempoEntrenado || "0"} segundos
      </p>

      <div className="my-3">
        <p className="text-slate-300"><strong>Progreso de la rutina:</strong></p>
        <ProgressBar now={porcentajeProgreso} label={`${Math.round(porcentajeProgreso)}%`} />
        {porcentajeProgreso === 100 && (
          <p className="text-green-500 mt-2">¡Felicidades! Has completado esta rutina.</p>
        )}
      </div>

      <p className="text-slate-300">
        <strong>Ejercicios Completados:</strong> {ejerciciosCompletados} / {totalEjercicios}
      </p>
      <p className="text-slate-300">
        <strong>Estado:</strong> {estadoRutina}
      </p>

      <footer className="mt-4">
        {loading ? (
          <p className="text-center text-slate-300">Eliminando rutina...</p>
        ) : (
          <div className="flex gap-x-3 items-center">
            <button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>
              Editar
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>
              Ver Ejercicios
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        )}
      </footer>
    </Card>
  );
}