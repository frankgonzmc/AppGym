import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import '../css/inicio.css';
import profileImage from '../imagenes/profileicono.png';

export function Inicio() {
    const { user } = useAuth();
    const [tmb, setTmb] = useState(null);
    const [error, setError] = useState("");
    const [newMultiplicador, setMultiplicador] = useState(null);
    const [estado, setEstado] = useState("");

    const profileImageUrl = user.profileImage ? `http://localhost:5000/uploads/perfil/${user._id}` : profileImage;

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
        setMultiplicador(newMultiplicador);
        setError("");
    };

    const calcularEstado = () => {
        const peso = user.peso || 0;
        const altura = user.estatura || 0;

        if (peso === 0 || altura === 0) {
            setEstado("Por favor, proporciona un peso y altura válidos.");
            return;
        }

        const imc = peso / (altura * altura);

        let nuevoEstado;

        if (imc < 16.00) {
            nuevoEstado = "Delgadez (desnutrición) severa";
        } else if (imc < 17.00) {
            nuevoEstado = "Delgadez (desnutrición) moderada";
        } else if (imc < 18.50) {
            nuevoEstado = "Delgadez (desnutrición) leve";
        } else if (imc < 25.00) {
            nuevoEstado = "Normal";
        } else if (imc < 30.00) {
            nuevoEstado = "Sobrepeso";
        } else if (imc < 35.00) {
            nuevoEstado = "Obesidad grado 1";
        } else if (imc < 40.00) {
            nuevoEstado = "Obesidad grado 2";
        } else {
            nuevoEstado = "Obesidad grado 3";
        }

        setEstado(nuevoEstado);
    };

    const calcularNutrientesDefinir = () => {
        if (tmb) {
            const totalCalorias = tmb.total - 500; // tmb es el resultado calculado
            const proteinas = (totalCalorias * 0.20) / 4; // 20% de proteínas
            const grasas = (totalCalorias * 0.25) / 9; // 25% de grasas
            const hidratos = (totalCalorias * 0.55) / 4; // 55% de carbohidratos

            return {
                proteinas: proteinas.toFixed(2),
                grasas: grasas.toFixed(2),
                hidratos: hidratos.toFixed(2)
            };
        }
        return {
            proteinas: "0.00",
            grasas: "0.00",
            hidratos: "0.00"
        };
    };

    const calcularNutrientesVolumen = () => {
        if (tmb) {
            const totalCalorias = tmb.total + 500; // tmb es el resultado calculado
            const proteinas = (totalCalorias * 0.20) / 4; // 20% de proteínas
            const grasas = (totalCalorias * 0.25) / 9; // 25% de grasas
            const hidratos = (totalCalorias * 0.55) / 4; // 55% de carbohidratos

            return {
                proteinas: proteinas.toFixed(2),
                grasas: grasas.toFixed(2),
                hidratos: hidratos.toFixed(2)
            };
        }
        return {
            proteinas: "0.00",
            grasas: "0.00",
            hidratos: "0.00"
        };
    };

    const nutrientedefinir = calcularNutrientesDefinir();
    const nutrientesVolumen = calcularNutrientesVolumen();

    useEffect(() => {
        calcularEstado();
    }, [user.peso, user.estatura]); // Recalcular el estado cuando cambien peso o altura

    return (
        <Container fluid className="body-inicio">
            <Row className="text-center mb-4">
                <Col>
                    <h1>Bienvenido a App Gym</h1>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Card className="info-card mb-4">
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
                            <p>Estado (IMC): {estado}</p>
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
                        <hr className="text-black my-2 mt-2" />
                        <Card.Body>
                            <Card.Title>Recomendaciones de Alimentaciones para *DEFINIR*</Card.Title>
                            {tmb ? (
                                <>
                                    <p>
                                        Tus calorias por días son: {tmb.total.toFixed(2)} Kcal/día
                                    </p>
                                    {nutrientedefinir && (
                                        <>
                                            <p>
                                                Proteínas: {nutrientedefinir.proteinas} g
                                            </p>
                                            <p>
                                                Grasas: {nutrientedefinir.grasas} g
                                            </p>
                                            <p>
                                                Hidratos de carbono: {nutrientedefinir.hidratos} g
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <p>Por favor, calcula primero tu TMB.</p>
                            )}
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>Recomendaciones de Alimentaciones para *VOLUMEN*</Card.Title>
                            {tmb ? (
                                <>
                                    <p>
                                        Tus calorias por días son: {tmb.total.toFixed(2)} Kcal/día
                                    </p>
                                    {nutrientesVolumen && (
                                        <>
                                            <p>
                                                Proteínas: {nutrientesVolumen.proteinas} g
                                            </p>
                                            <p>
                                                Grasas: {nutrientesVolumen.grasas} g
                                            </p>
                                            <p>
                                                Hidratos de carbono: {nutrientesVolumen.hidratos} g
                                            </p>
                                        </>
                                    )}
                                </>
                            ) : (
                                <p>Por favor, calcula primero tu TMB.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="info-card">
                        <Card.Body>
                            <Card.Title>¿Qué es App Gym?</Card.Title>
                            <p>
                                App Gym es una aplicación web que te ayuda a mejorar tus habilidades y llevar una vida más saludable.
                                Explora nuestras recomendaciones de ejercicios y disfruta de una experiencia única.
                            </p>
                            <Button variant="primary" className="mt-3">
                                <Link to="/about" className="text-white">Conoce más sobre nosotros y nuestro programa</Link>
                            </Button>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3 mb-4">
                        <Card.Body>
                            <Card.Title>Recomendaciones de Rutinas y Alimentación</Card.Title>
                            <p>
                                Mejora tus habilidades físicas con nuestras recomendaciones personalizadas.
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
                                ¡No te pierdas la oportunidad de alcanzar tus objetivos!
                            </p>
                            <Card.Footer className="text-center">
                                <Link to="/machine-learning">Conoce más sobre tus recomendaciones de Ejercicios</Link>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3 mb-4">
                        <Card.Body className="panel-elements">
                            <PanelElements />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="exercise-card w-full h-full">
                        <Card.Body>
                            <PanelEjercicios />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
