import React, { useState } from 'react';
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';

export default function MlPage() {
    const { user } = useAuth();
    const [peso, setPeso] = useState(user.peso || "");
    const [altura, setAltura] = useState(user.altura || "");
    const [edad, setEdad] = useState(user.edad || "");
    const [genero, setGenero] = useState(user.genero || "");
    const [tmb, setTmb] = useState(null);
    const [error, setError] = useState("");

    const calcularTMB = () => {
        let resultado;

        if (genero === 'mujer') {
            resultado = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);
        } else if (genero === 'varon') {
            resultado = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad);
        } else {
            setError("Por favor, selecciona un género válido.");
            return;
        }

        setTmb(resultado);
        setError("");
    };

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <Card className="info-card mt-3 my-3">
                        <Card.Body>
                            <Card.Title>¿Recomendaciones de rutinas para ejercicios?</Card.Title>
                            <p>
                                ¡No te pierdas la oportunidad de mejorar tus habilidades!
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
                            </p>
                            <p>
                                Esta es tu predicción en base a tus objetivos ({user.objetivos}) y según tu nivel de actividad actual {user.nivelActividad}.
                            </p>
                        </Card.Body>

                        <Card.Body>
                            <Card.Title>Calculadora de Tasa de Metabolismo Basal (TMB)</Card.Title>
                            <Form>
                                <Form.Group controlId="peso">
                                    <Form.Label>Peso (kg)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={peso}
                                        onChange={(e) => setPeso(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="altura">
                                    <Form.Label>Altura (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={altura}
                                        onChange={(e) => setAltura(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="edad">
                                    <Form.Label>Edad (años)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="genero">
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Select
                                        value={genero}
                                        onChange={(e) => setGenero(e.target.value)}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="mujer">Mujer</option>
                                        <option value="varon">Varón</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button onClick={calcularTMB} variant="primary" className="mt-3">
                                    Calcular TMB
                                </Button>
                            </Form>

                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                            {tmb !== null && (
                                <Alert variant="success" className="mt-3">
                                    Tu Tasa de Metabolismo Basal es: {tmb.toFixed(2)} Kcal/día
                                </Alert>
                            )}
                        </Card.Body>

                        <Card.Body>
                            <Card.Title>¿Quieres saber cómo calcular tus calorías?</Card.Title>
                            <p>Nivel: {user.nivel}</p>
                            <p>Peso: {user.peso}</p>
                            <p>Altura: {user.altura}</p>
                            <p>Edad: {user.edad}</p>
                            <p>Sexo: {user.genero}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
