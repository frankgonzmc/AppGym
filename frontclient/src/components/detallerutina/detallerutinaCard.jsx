import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "react-bootstrap"; // Asegúrate de tener react-bootstrap instalado

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteDetalleRutina(detalles._id);
      navigate("/");
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
    <Card className="text-white bg-secondary">
      <Card.Body>
        <Card.Title className="text-center">{detalles.ejercicio.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-black text-center">Descripción: {detalles.ejercicio.descripcion}</Card.Subtitle>
        <Card.Text>
          Categoría: {detalles.ejercicio.categoria}
          Duración: {detalles.ejercicio.duracion} segundos
          Series: {detalles.ejercicio.series}
          Repeticiones: {detalles.ejercicio.repeticiones}
          Descanso: {detalles.ejercicio.descanso}
          Series Completadas: {detalles.seriesProgreso} / {detalles.ejercicio.series}
          Estado: {detalles.estado}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
        <button className="btn btn-success" onClick={handleStartOrContinueExercise}>
          {detalles.seriesProgreso > 0 ? "Continuar Ejercicio" : "Iniciar Ejercicio"}
        </button>
      </Card.Footer>
    </Card>
  );
}
