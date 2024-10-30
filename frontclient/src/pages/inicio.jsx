import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../css/inicio.css';

export function Inicio() {
    const { user } = useAuth();
    console.log(user);

    return (
        <Container className="inicio-container">
            <Row className="mb-3">
                <div className="panel-elements">
                    <PanelElements />
                </div>
            </Row>
            <Row>
                <div className="panel-ejercicios">
                    <PanelEjercicios />
                </div>
            </Row>
        </Container>
    );
}
