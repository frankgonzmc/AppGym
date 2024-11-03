import React from 'react'
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function mlPage() {

    const { user } = useAuth();

    const prediccion = "* Mejorar resistencia cardiovascular *";

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
                            <p> esta es tu predicción en base a tus objetivos ({user.objetivos}) y segun tu nivel de actividad actual {user.nivelActividad} seleccionados  para tus rutinas de ejercicios y rutina de alimentación: ({prediccion})</p>
                            <p>  </p>
                            <Card.Title>¿¿Quieres empezar una Dieta??</Card.Title>
                            <p>
                                Empieza hacer Dieta mediante tus objetivos si tu quieres tener un cuerpo *DEFINIDO* y saludable. Sigue estas instruciones para empezar tu dieta.
                            </p>
                            <p>
                                Empieza hacer Dieta mediante tus objetivos si tu quieres tener un cuerpo en *VOLUMEN* y saludable. Sigue estas instruciones para empezar tu dieta.
                            </p>
                            <p>
                                2. Asegúrate de consumir una cantidad adecuada de proteínas, carbohidratos y grasas.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
