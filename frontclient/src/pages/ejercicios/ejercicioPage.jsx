import { useEffect, useState } from "react";
import { useEjercicios } from "../../context/ejercicioscontext";
import { EjercicioCard } from "../../components/ejercicio/ejercicioCard";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import "../../css/ejercicioPage.css";
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

export default function EjercicioPage() {
  const { ejercicios, getEjercicios } = useEjercicios();
  const [categoria, setCategoria] = useState("Todos");
  const [nivel, setNivel] = useState("Todos");

  useEffect(() => {
    getEjercicios();
  }, []);

  // Filtrar ejercicios según la categoría y el nivel seleccionados
  const ejerciciosFiltrados = ejercicios.filter((ejercicio) => {
    return (
      (categoria === "Todos" || ejercicio.categoria === categoria) &&
      (nivel === "Todos" || ejercicio.nivel === nivel)
    );
  });

  return (
    <section className="seccion">
      <Container className="py-4">
        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="categoriaSelect">
              <Form.Label className="mb-0 text-white font-bold background-black">Filtrar por Categoría</Form.Label>
              <Form.Control
                as="select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option className="text-white" value="Todos">Todos</option>
                <option value="Cardio">Cardio</option>
                <option value="Pecho">Pecho</option>
                <option value="Piernas">Piernas</option>
                <option value="Espalda">Espalda</option>
                <option value="Abdomen">Abdomen</option>
                <option value="Core">Core</option>
                <option value="Tríceps">Tríceps</option>
                <option value="Bíceps">Bíceps</option>
                <option value="Hombros">Hombros</option>
                <option value="Cuerpo Completo">Cuerpo Completo</option>
                <option value="Pliometría">Pliometría</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="nivelSelect">
              <Form.Label className="mb-0 text-white font-bold background-black">Filtrar por Nivel</Form.Label>
              <Form.Control
                as="select"
                value={nivel}
                onChange={(e) => setNivel(e.target.value)}
              >
                <option value="Todos">Todos</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {!ejerciciosFiltrados || ejerciciosFiltrados.length === 0 ? (
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
            {ejerciciosFiltrados.map((ejercicio) => (
              <Col md={6} lg={4} key={ejercicio._id}>
                <EjercicioCard ejercicio={ejercicio} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
}
