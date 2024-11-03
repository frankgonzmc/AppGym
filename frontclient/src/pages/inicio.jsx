import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import '../css/inicio.css';
import profileImage from '../imagenes/profileicono.png';

export function Inicio() {
    const { user } = useAuth();
    const [tmb, setTmb] = useState(null);
    const [error, setError] = useState("");
    const [multiplicador, setMultiplicador] = useState(null); // Agregar estado para multiplicador

    const profileImageUrl = user.profileImage
        ? `http://localhost:5000/uploads-perfil/${user._id}/${user.profileImage}`
        : profileImage;

    const calcularTMB = () => {
        const peso = user.peso || 0;
        const altura = user.estatura || 0;
        const nivelActividad = user.nivelActividad || '';
        const edad = user.edad || 0;
        const genero = user.genero || '';

        let resultado;

        // Calcular TMB
        if (genero === 'mujer') {
            resultado = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);
        } else if (genero === 'varon') {
            resultado = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad);
        } else {
            setError("Por favor, selecciona un género válido.");
            return;
        }

        // Validar nivel de actividad
        let newMultiplicador;
        switch (nivelActividad) {
            case "Sedentario":
                newMultiplicador = 1.2;
                break;
            case "Ejercicio Leve":
                newMultiplicador = 1.375;
                break;
            case "Ejercicio Media":
                newMultiplicador = 1.55;
                break;
            case "Ejercicio Fuerte":
                newMultiplicador = 1.725;
                break;
            case "Ejercicio Extra Fuerte":
                newMultiplicador = 1.9;
                break;
            default:
                setError("Por favor, dirígete a tu perfil y actualiza tu nivel de actividad para poder calcular tu TMB.");
                return;
        }

        const tdee = resultado * newMultiplicador; // TDEE total
        setTmb({ basal: resultado, total: tdee });
        setMultiplicador(newMultiplicador); // Guardar el multiplicador en el estado
        setError("");
    };

    return (
        <Container fluid className="body-inicio">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Bienvenido a App Gym</h1>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="mb-4">
                    <Card className="info-card">
                        <Card.Body>
                            <Card.Title>¿Qué es App Gym?</Card.Title>
                            <p>
                                App Gym es una aplicación web que te ayuda a mejorar tus habilidades y llevar una vida más saludable.
                                Explora nuestras recomendaciones de ejercicios y disfruta de una experiencia única.
                            </p>
                            <Button variant="primary" className="mt-3">
                                <Link to="/about">Conoce más sobre nosotros y nuestro programa</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3">
                        <Card.Body>
                            <Card.Title>Recomendaciones de Ejercicios</Card.Title>
                            <p>
                                Mejora tus habilidades físicas con nuestras recomendaciones personalizadas.
                                ¡No te pierdas la oportunidad de alcanzar tus objetivos!
                            </p>
                            <Card.Footer className="text-center">
                                <Link to="/machine-learning">Conoce más sobre tus recomendaciones</Link>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3">
                        <Card.Body className="panel-elements">
                            <PanelElements />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="info-card">
                        <Card.Body>
                            <div className="text-center">
                                {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image" />}
                            </div>
                            <p>Nivel: {user.nivel}</p>
                            <p>Peso: {user.peso} kg</p>
                            <p>Altura: {user.estatura} cm</p>
                            <p>Edad: {user.edad} años</p>
                            <p>Sexo: {user.genero}</p>
                            <p>Objetivos: {user.objetivos}</p>
                            <p>Nivel de Actividad: {user.nivelActividad}</p>
                            <hr className="text-black my-4" />
                            <Button onClick={calcularTMB} variant="success" className="mt-3 my-2">
                                Calcular TMB
                            </Button>
                            <Card.Footer>
                                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                                {tmb && (
                                    <Alert variant="success" className="mt-3">
                                        Tu Tasa de Metabolismo Basal es: {tmb.basal.toFixed(2)} Kcal/día<br />
                                        Tus Kcal/día son: {tmb.total.toFixed(2)} Kcal
                                    </Alert>
                                )}
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                    <Card className="exercise-card mt-3">
                        <Card.Body>
                            <PanelEjercicios />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
