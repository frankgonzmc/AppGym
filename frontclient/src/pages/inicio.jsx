import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/inicio.css';

export function Inicio() {
    const { user } = useAuth();

    return (
        <Container fluid className="body">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Bienvenido a App Gym</h1>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="mb-4">
                    <Card className="info-card">
                        <Card.Body>
                            <Card.Title>Recomendaciones de Ejercicios</Card.Title>
                            <Card.Text>
                                <p>Conoce ejercicios recomendados para mejorar tu rendimiento.</p>
                                <p>Aprende a mejorar tus habilidades y tu vida diaria.</p>
                                <p>¡Empieza a explorar y disfruta la experiencia App Gym!</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3">
                        <Card.Body>
                            <p>Nivel: {user.nivel}</p>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3">
                        <Card.Body className="panel-elements">
                            <PanelElements />
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Link to="/machine-learning">Conoce más sobre tus recomendaciones</Link>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="exercise-card">
                        <Card.Body>
                            <PanelEjercicios />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
