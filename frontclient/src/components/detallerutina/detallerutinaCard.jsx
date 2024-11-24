import { useNavigate } from "react-router-dom";
import { useDetallesRutina } from "../../context/detallerutinacontext";
import { Card } from "react-bootstrap";
import "../../css/detallePage.css";
import { showConfirmation } from "../alerts/utils-alerts";
import { useState, useEffect } from "react";

export default function DetalleRutinaCard({ detalles }) {
  const { deleteDetalleRutina } = useDetallesRutina();
  const navigate = useNavigate();
  const [caloriasQuemadas, setCaloriasQuemadas] = useState(0);

  // Calcular calorías quemadas dinámicamente
  useEffect(() => {
    if (detalles) {
      const totalRepeticiones = detalles.seriesProgreso * detalles.ejercicio.repeticiones;
      const calorias = totalRepeticiones * detalles.ejercicio.caloriasPorRepeticion;
      setCaloriasQuemadas(calorias);
    }
  }, [detalles]);

  const handleDelete = async () => {
    try {
      await deleteDetalleRutina(detalles._id);
      navigate("/rutinas");
      showConfirmation("Éxito!", "Se eliminó el ejercicio.", "success");
    } catch (error) {
      console.error("Error al eliminar el detalle:", error);
      showConfirmation("Error", "Hubo un problema al eliminar el ejercicio.", "danger");
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

  return (
    <section className="seccion-card">
      <Card className="text-white bg-primary">
        <Card.Body>
          <Card.Title className="text-center">{detalles.ejercicio.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-black text-center">
            Descripción: {detalles.ejercicio.descripcion}
          </Card.Subtitle>
          <p className="text-center">Categoría: {detalles.ejercicio.categoria}</p>
          <p className="text-center">Duración: {detalles.ejercicio.duracion} segundos</p>
          <p className="text-center">Series: {detalles.ejercicio.series}</p>
          <p className="text-center">Repeticiones: {detalles.ejercicio.repeticiones}</p>
          <p className="text-center">Descanso: {detalles.ejercicio.descanso}</p>
          <p className="text-center">
            Series Completadas: {detalles.seriesProgreso} / {detalles.ejercicio.series}
          </p>
          <p className="text-center">
            Estado: <strong>{estadoEjercicio}</strong>
          </p>
          <p className="text-center">
            Calorías Quemadas: <strong>{caloriasQuemadas.toFixed(2)} kcal</strong>
          </p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
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
