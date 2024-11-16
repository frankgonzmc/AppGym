import { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRutinasConProgreso = async () => {
      setIsLoading(true); // Activa el estado de carga

      // Obtiene las rutinas del contexto
      const rutinasList = await getRutinas();

      // Valida si hay rutinas para obtener progreso
      if (Array.isArray(rutinasList) && rutinasList.length > 0) {
        for (const rutina of rutinasList) {
          // Valida si ya existe el progreso antes de obtenerlo
          if (!progreso[rutina._id]) {
            await getProgreso(rutina._id); // Llama a getProgreso solo si no está cargado
          }
        }
      } else {
        console.warn("No hay rutinas o la respuesta no es válida.");
      }
      setIsLoading(false); // Desactiva el estado de carga
    };

    fetchRutinasConProgreso(); // Llama solo una vez
  }, [getRutinas, getProgreso, progreso]); // Incluye `progreso` como dependencia para evitar repeticiones innecesarias


  if (isLoading) {
    return (
      <section className="seccion">
        <Container className="py-4">
          <p>Cargando rutinas...</p>
        </Container>
      </section>
    );
  }

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
            <header>
              <Link to="/add-rutinas" className="btn btn-success">
                CREAR RUTINA
              </Link>
            </header>
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
