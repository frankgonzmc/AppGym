import { useEffect } from "react";
import { useRutinas } from "../../context/rutinascontext";
import { useProgreso } from "../../context/progresocontext";
import { RutinaCard } from "../../components/rutina/rutinaCard";
import "../../css/rutinaPage.css";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function RutinaPage() {
  const { rutinas, getRutinas } = useRutinas();
  const { getProgreso } = useProgreso();

  useEffect(() => {
    const fetchRutinasConProgreso = async () => {
      const rutinasList = await getRutinas();
      if (Array.isArray(rutinasList)) {
        rutinasList.forEach(rutina => getProgreso(rutina._id));
      } else {
        console.error("Error: 'getRutinas' no devolvió una lista válida de rutinas.");
      }
    };

    fetchRutinasConProgreso();
  }, []); // Solo se ejecuta una vez al cargar la página

  return (
    <section className="seccion">
      <Container className="py-4">
        {!rutinas || rutinas.length === 0 ? (
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
        ) : (
          <Row className="g-4">
            {rutinas.map((rutina) => (
              <Col md={6} key={rutina._id}>
                <RutinaCard rutina={rutina} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}
