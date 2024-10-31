import { useEffect } from "react";
import { useRutinas } from "../../context/rutinascontext";
import { useProgreso } from "../../context/progresocontext"; // Importar el contexto de progreso
import { RutinaCard } from "../../components/rutina/rutinaCard";
import "../../css/rutinaPage.css";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();
  const { getProgreso } = useProgreso(); // Obtener la función getProgreso del contexto

  useEffect(() => {
    const fetchRutinas = async () => {
      await getRutinas();
      rutinas.forEach(rutina => {
        getProgreso(rutina._id); // Obtener progreso para cada rutina
      });
    };

    fetchRutinas();
  }, [getRutinas, rutinas, getProgreso]); // Agregar dependencias al efecto

  return (
    <Container className="seccion">
      {!rutinas || rutinas.length === 0 ? ( // Cambiar && por ?
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Card className="p-4">
              <ImFileEmpty className="text-center text-6xl text-gray-400 mb-3" />
              <h1 className="font-bold">No hay Rutinas por el momento</h1>
              <p className="mb-4">Agrega una nueva rutina para empezar.</p>
              <Link to="/add-rutinas" className="btn btn-primary">
                CREAR RUTINA
              </Link>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="g-4">
          {rutinas.map((rutina) => (
            <Col md={6} lg={4} key={rutina._id}>
              <RutinaCard rutina={rutina} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
