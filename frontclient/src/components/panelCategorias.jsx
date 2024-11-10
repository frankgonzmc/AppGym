import calendar from "../imagenes/calendar.png";
import muscle from "../imagenes/muscle.png";
import control from "../imagenes/control.png";
import tab from "../imagenes/tab.png";
import body from "../imagenes/body.png";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/panelElements.css';

export function PanelElements() {
    const panelItems = [
        { to: "/calendar", img: calendar, title: "Calendario" },
        { to: "/rutinas", img: muscle, title: "Mis Rutinas" },
        { to: "/progreso", img: control, title: "Panel de Progresos" },
        { to: "/add-rutinas", img: tab, title: "Crear Rutina" },
        { to: "/ejercicios", img: body, title: "Ver Ejercicios" }
    ];

    return (
        <Container className="panel-container">
            <h2 className="panel-title">Las Categorias de los ejercicios</h2>
            <Row className="justify-content-center">
                {panelItems.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Link to={item.to} className="paneles-link">
                            <Card className="paneles-item text-center">
                                <Card.Img variant="top" src={item.img} alt={item.title} className="paneles-img" />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
