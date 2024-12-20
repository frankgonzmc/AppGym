import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "react-bootstrap";
import '../../css/detallePage.css';
import { showConfirmation } from "../alerts/utils-alerts";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDetalleRutina(detalles._id);
      navigate("/rutinas");
      showConfirmation("Exito!", "Se eliminó el ejercicio.", "success");
    } catch (error) {
      console.error("Error al eliminar el detalle:", error);
    }
  };

  const handleStartOrContinueExercise = () => {
    if (!detalles) {
      console.error("Detalles incompletos:", detalles);
      showConfirmation("Error", "Los detalles no están completos.", "danger");
      return;
    }

    navigate(`/iniciar-ejercicios`, {
      state: { detalles, continuar: detalles.seriesProgreso > 0 },
    });
  };

  // Validar estado del ejercicio
  const estadoEjercicio = detalles.seriesProgreso === detalles.ejercicio.series ? "Completado" : "Pendiente";

  // Validar estadoEjercicioCompletado (si es requerido)
  const estadoEjercicioCompletado = detalles.ejercicio.estadoEjercicioRealizado === 1 ? "Completado" : "Pendiente";

  // Validar estadoEjercicioCompletado (si es requerido)
  const estadoRutinaCompletado = estadoEjercicio === estadoEjercicioCompletado ? "Pendiente" : "Completado";

  return (
    <section className="seccion-card">
      <Card className="text-black bg-primary">
        <Card.Body>
          <Card.Title className="text-black text-center">{detalles.ejercicio.nombre}</Card.Title>
          <hr className="text-black mt-3 my-4"/>
          <Card.Subtitle className="mb-2 text-black text-center">
            Descripción: {detalles.ejercicio.descripcion}
          </Card.Subtitle>
          <hr className="text-black mt-3 my-4" />
          <p className=" text-white text-left">Categoría: {detalles.ejercicio.categoria}</p>
          <p className="text-white text-left">Duración: {detalles.ejercicio.duracion} segundos</p>
          <p className="text-white text-left">Series: {detalles.ejercicio.series}</p>
          <p className="text-white text-left">Repeticiones: {detalles.ejercicio.repeticiones}</p>
          <p className="text-white text-left">Descanso: {detalles.ejercicio.descanso}</p>
          <p className="text-white text-left">
            Series Completadas: {detalles.seriesProgreso} / {detalles.ejercicio.series}
          </p>
          {/*
          <p className="text-white text-left">
            Estado: <strong>{estadoEjercicio}</strong>
          </p>*/}
          <p className="text-white text-left">
            Estado del Ejercicio: <strong>{estadoRutinaCompletado}</strong>
          </p>
          <p className="text-white text-left"></p>
        </Card.Body>
        <Card.Footer className="text-white d-flex justify-content-between">
          <button className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="btn btn-success" onClick={handleStartOrContinueExercise}>
            {detalles.seriesProgreso > 0 ? "Continuar Ejercicio" : "Iniciar Ejercicio"}
          </button>
        </Card.Footer>
      </Card>
    </section>
  );
}
