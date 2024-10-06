import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../css/inicio.css';

export function Inicio() {
    const { user } = useAuth();
    console.log(user);

    return (
        <div className="inicio-container">
            <Row>
                <Col md={6}>
                    <div className="panel-elements">
                        <PanelElements />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="panel-ejercicios">
                        <PanelEjercicios />
                    </div>
                </Col>
            </Row>
        </div >
    );
}
