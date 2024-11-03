import React from 'react'
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function mlPage() {

    const { user } = useAuth();

    return (
        <Container>
            <Row>
                <Col className="text-center">
                    <Card className="info-card mt-3 my-3">
                        <Card.Body>
                            <Card.Title>¿recomendaciones de rutinas para ejercicios?</Card.Title>
                            <p>
                                ¡No te pierdas la oportunidad de mejorar tus habilidades!
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
                            </p>

                            <p> esta es tu predicción en base a tus objetivos () seleccionados  para tus rutinas de ejercicios y rutina de alimentación: </p>
                            <p>
                                {user.objetivos.map((objetivo, index) => (
                                    <span key={index}>{objetivo} </span>
                                ))}
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
