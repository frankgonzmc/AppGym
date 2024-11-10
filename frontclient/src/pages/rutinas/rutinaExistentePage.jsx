import React, { useEffect, useState } from 'react';
import { useRutinas } from "../../context/rutinascontext";
import { useAuth } from "../../context/authcontext";
import { RutinaCard } from "../../components/rutina/rutinaCard";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "../../css/rutinaPage.css";

function RutinaExistentePage() {
  const { rutinas, getRutinas, createRutina, createDetalleRutina } = useRutinas();
  const { user } = useAuth();
  const [rutinasPredeterminadas, setRutinasPredeterminadas] = useState([]);

  useEffect(() => {
    const fetchRutinasPredeterminadas = async () => {
      await getRutinas();
      const predeterminadas = rutinas.filter(rutina => rutina.predeterminado);
      setRutinasPredeterminadas(predeterminadas);
    };

    fetchRutinasPredeterminadas();
  }, [rutinas]);

  const handleAgregarRutina = async (rutina) => {
    try {
      // Crear una nueva rutina basada en la predeterminada seleccionada
      const nuevaRutina = {
        user: user._id,
        nombre: rutina.nombre,
        descripcion: rutina.descripcion,
        totalEjercicios: rutina.totalEjercicios,
        predeterminado: false, // La rutina copiada no será predeterminada
      };

      // Guardar la nueva rutina
      const rutinaCreada = await createRutina(nuevaRutina);

      // Clonar los detalles (ejercicios) de la rutina seleccionada
      if (rutina.detalles && rutina.detalles.length > 0) {
        const detallesRutina = rutina.detalles.map(detalle => ({
          rutina: rutinaCreada._id,
          ejercicio: detalle.ejercicio._id,
          fecha: new Date(),
        }));

        // Llama a una función para crear los detalles de la rutina
        await Promise.all(detallesRutina.map(detalle => createDetalleRutina(detalle)));
      }

      alert("Rutina agregada exitosamente a tus rutinas");
    } catch (error) {
      console.error("Error al agregar rutina:", error);
      alert("Hubo un problema al agregar la rutina");
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Rutinas Disponibles</h2>
      <Row className="g-4">
        {rutinasPredeterminadas.map((rutina) => (
          <Col md={6} key={rutina._id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{rutina.nombre}</Card.Title>
                <Card.Text>{rutina.descripcion}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleAgregarRutina(rutina)}
                >
                  Agregar a Mis Rutinas
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RutinaExistentePage;
