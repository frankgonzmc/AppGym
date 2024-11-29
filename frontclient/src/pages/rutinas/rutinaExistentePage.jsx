import React from "react";
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "../../css/rutinaPage.css";
import { generarRutinas } from "../../components/generadorRutinas";

function RutinaExistentePage() {
  const { user } = useAuth();
  const rutinasGeneradas = generarRutinas(ejerciciosPredeterminados);

  return (
    <section className="seccion">
      <Container className="py-4">
        <h2 className="text-center mb-4">Rutinas Disponibles</h2>
        <Row className="g-4">
          {rutinasGeneradas.map((rutina, index) => (
            <Col md={6} key={index} className="text-center">
              <Card className="p-4">
                <h1 className="font-bold">{`Rutina de ${rutina.categoria}`}</h1>
                <p className="mb-4">{`Nivel: ${rutina.nivel}`}</p>
                <h2>Ejercicios:</h2>
                <ul className="text-start">
                  {rutina.ejercicios.map((ejercicio, idx) => (
                    <li key={idx}>
                      {ejercicio.nombre} - {ejercicio.series} series x {ejercicio.repeticiones} reps
                    </li>
                  ))}
                </ul>
                <Button variant="primary" className="mt-4">
                  Iniciar Rutina
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default RutinaExistentePage;
