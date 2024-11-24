import { useEffect, useState } from "react";
import { useRutinas } from "../../context/rutinascontext";
import { RutinaCard } from "../../components/rutina/rutinaCard";
import "../../css/rutinaPage.css";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();
  const [isLoading, setIsLoading] = useState(true);

  // Obtener rutinas y actualizar estado
  useEffect(() => {
    const fetchRutinas = async () => {
      setIsLoading(true);
      try {
        await getRutinas(); // Recarga todas las rutinas desde el backend
      } catch (error) {
        console.error("Error al obtener rutinas:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRutinas();
  }, [getRutinas]);

  // Si está cargando, mostramos un mensaje de "Cargando"
  if (isLoading) {
    return (
      <section className="seccion">
        <Container className="py-4 text-center">
          <h3 className="text-primary">Cargando rutinas...</h3>
        </Container>
      </section>
    );
  }

  // Renderizamos si no hay rutinas
  if (!rutinas || rutinas.length === 0) {
    return (
      <section className="seccion">
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col md={6} className="text-center">
              <Card className="p-4">
                <ImFileEmpty className="align-middle text-center text-6xl text-gray-400 mb-3" />
                <h1 className="font-bold">No hay Rutinas por el momento</h1>
                <p className="mb-4">Agrega una nueva rutina para empezar.</p>
                <Link to="/add-rutinas" className="btn btn-primary">
                  CREAR RUTINA
                </Link>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }

  // Si hay rutinas, las mostramos
  return (
    <section className="seccion">
      <Container className="py-4">
        <Row className="g-4">
          <header>
            <Link to="/add-rutinas" className="btn btn-success mb-4">
              CREAR RUTINA
            </Link>
          </header>
          {rutinas.map((rutina) => (
            <Col md={6} key={rutina._id}>
              <RutinaCard rutina={rutina} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
