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

  // Efecto para cargar las rutinas y su progreso
  useEffect(() => {
    const fetchRutinasConProgreso = async () => {
      setIsLoading(true);
      try {
        const rutinasList = await getRutinas();
        if (rutinasList && rutinasList.length > 0) {
          // Si hay rutinas, obtenemos el progreso de cada una
          for (const rutina of rutinasList) {
            await getProgreso(rutina._id); // Solo si hay progreso asociado
          }
        } else {
          console.log("No se encontraron rutinas."); // Mensaje claro si no hay rutinas
        }
      } catch (error) {
        console.error("Error al obtener rutinas:", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRutinasConProgreso();
  }, [getRutinas, getProgreso]);

  // Si está cargando, mostramos un mensaje de "Cargando"
  if (isLoading) {
    return <p>Cargando rutinas...</p>;
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
      </Container>
    </section>
  );
}
