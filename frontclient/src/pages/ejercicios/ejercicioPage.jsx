import { useEffect } from "react";
import { useEjercicios } from "../../context/ejercicioscontext";
import { EjercicioCard } from "../../components/ejercicio/ejercicioCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function EjercicioPage() {
  const { ejercicios, getEjercicios } = useEjercicios();

  useEffect(() => {
    getEjercicios();
  }, []);

  return (
    <Container className="py-4 mt-4">
      {!ejercicios || ejercicios.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Card className="p-4">
              <ImFileEmpty className="text-6xl text-gray-400 mb-3" />
              <h1 className="font-bold">No hay ejercicios por el momento</h1>
              <p>Agrega uno nuevo para comenzar.</p>
              <Link to="/add-ejercicios" className="btn btn-primary">
                CREAR EJERCICIOS
              </Link>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="g-4">
          {ejercicios.map((ejercicio) => (
            <Col md={6} lg={4} key={ejercicio._id}>
              <EjercicioCard ejercicio={ejercicio} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
