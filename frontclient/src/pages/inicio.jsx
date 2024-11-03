import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../css/inicio.css';
import profileImage from '../imagenes/profileicono.png';

export function Inicio() {
    const { user } = useAuth();
    const profileImageUrl = user.profileImage ? `http://localhost:5000/uploads-perfil/${user._id}/${user.profileImage}` : profileImage;


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
                                App Gym es una aplicación web que te ayuda a mejorar tus habilidades y mejorar tu vida diaria.
                                Conoce las recomendaciones de ejercicios para mejorar tus habilidades.
                                Aprende a mejorar tus habilidades y mejorar tu vida diaria.
                                ¡Empieza a explorar las recomendaciones de ejercicios!
                                ¡Disfruta de la experiencia de App Gym!
                                ¡No te pierdas la oportunidad de mejorar tus habilidades!
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
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
                                Conoce las recomendaciones de ejercicios para mejorar tus habilidades.
                                Aprende a mejorar tus habilidades y mejorar tu vida diaria.
                                ¡Empieza a explorar las recomendaciones de ejercicios!
                                ¡Disfruta de la experiencia de App Gym!
                                ¡No te pierdas la oportunidad de mejorar tus habilidades!
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
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
                            <div className="card text-center">
                                {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image" />}
                            </div>
                            <p>Nivel: {user.nivel}</p>
                            <p>Peso: {user.peso}</p>
                            <p>Altura: {user.estatura}</p>
                            <p>Edad: {user.edad}</p>
                            <p>Sexo: {user.genero}</p>
                            <p>Objetivos: {user.objetivos}</p>
                            <p>Nivel de Actividad: {user.nivelActividad}</p>

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
