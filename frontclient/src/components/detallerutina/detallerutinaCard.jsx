import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "react-bootstrap";
import '../../css/detallePage.css';

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDetalleRutina(detalles._id);
      navigate("/rutinas");
    } catch (error) {
      console.error("Error al eliminar el detalle:", error);
    }
  };

  const handleStartOrContinueExercise = async () => {
    if (!detalles) {
      console.error("Detalles incompletos:", detalles);
      return;
    }

    if (detalles.seriesProgreso > 0) {
      navigate(`/iniciar-ejercicios`, { state: { detalles, continuar: true } });
    } else {
      navigate(`/iniciar-ejercicios`, { state: { detalles } });
    }
  };

  return (
    <section className="seccion-card">
      <Card className="text-white bg-primary">
        <Card.Body>
          <Card.Title className="text-center">{detalles.ejercicio.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-black text-center">Descripción: {detalles.ejercicio.descripcion}</Card.Subtitle>
          <p className="text-center">Categoría: {detalles.ejercicio.categoria}</p>
          <p className="text-center">Duración: {detalles.ejercicio.duracion} segundos</p>
          <p className="text-center">Series: {detalles.ejercicio.series}</p>
          <p className="text-center">Repeticiones: {detalles.ejercicio.repeticiones}</p>
          <p className="text-center">Descanso: {detalles.ejercicio.descanso}</p>
          <p className="text-center">Series Completadas: {detalles.seriesProgreso} / {detalles.ejercicio.series}</p>
          <p className="text-center">Estado: 
            {detalles.ejercicio.estado === "Completado" ? "Pendiente" : 1}
          </p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          <button className="btn btn-success" onClick={handleStartOrContinueExercise}>
            {detalles.seriesProgreso > 0 ? "Continuar Ejercicio" : "Iniciar Ejercicio"}
          </button>
        </Card.Footer>
      </Card>
    </section>
  );
}
