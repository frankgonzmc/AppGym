import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import Cookies from 'js-cookie';
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import '../css/inicio.css';
import profileImage from '../imagenes/profileicono.png';
import useRoutineAlerts from "../components/alerts-rutinas";

export function Inicio() {
    const { user, updateDatosPerfil } = useAuth();
    const [tmb, setTmb] = useState(null);
    const [error, setError] = useState("");
    const [newMultiplicador, setMultiplicador] = useState(null);
    const [alertsEnabled, setAlertsEnabled] = useState(true); // Control para activar/desactivar alertas
    const [estado, setEstado] = useState("");
    const [perfilActualizado, setPerfilActualizado] = useState(false); // Estado para evitar bucles
    const profileImageUrl = user.profileImage ? `http://localhost:5000/uploads/perfil/${user._id}` : profileImage;

    //useRoutineAlerts(alertsEnabled ? 10000 : null); // Activar alertas solo si `alertsEnabled` es true
    useRoutineAlerts(10000); // Activar alertas solo si `alertsEnabled` es true

    const calcularTMB = () => {
        const { peso = 0, estatura = 0, nivelActividad = "", edad = 0, genero = "" } = user;

        let resultado;

        if (genero === "mujer") {
            resultado = 655 + 9.6 * peso + 1.8 * estatura - 4.7 * edad;
        } else if (genero === "varon") {
            resultado = 66 + 13.7 * peso + 5 * estatura - 6.8 * edad;
        } else {
            setError("Por favor, selecciona un género válido.");
            return;
        }

        let multiplicador = {
            Sedentario: 1.2,
            "Ejercicio Leve": 1.375,
            "Ejercicio Media": 1.55,
            "Ejercicio Fuerte": 1.725,
            "Ejercicio Extra Fuerte": 1.9,
        }[nivelActividad];

        if (!multiplicador) {
            setError("Por favor, actualiza tu nivel de actividad en el perfil.");
            return;
        }

        const tdee = resultado * multiplicador;
        setTmb({ basal: resultado, total: tdee });
        setError("");
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


    // Calcular estado basado en IMC
    const calcularEstado = () => {
        const { peso = 0, estatura = 0 } = user;

        if (peso === 0 || estatura === 0) {
            return "Por favor, proporciona un peso y altura válidos.";
        }

        const imc = peso / (estatura * estatura);
        if (imc < 16.0) return "Delgadez severa";
        if (imc < 17.0) return "Delgadez moderada";
        if (imc < 18.5) return "Delgadez leve";
        if (imc < 25.0) return "Normal";
        if (imc < 30.0) return "Sobrepeso";
        if (imc < 35.0) return "Obesidad grado 1";
        if (imc < 40.0) return "Obesidad grado 2";
        return "Obesidad grado 3";
    };

    // useEffect para actualizar el perfil solo cuando sea necesario
    useEffect(() => {
        if (perfilActualizado) return; // Evita reejecuciones innecesarias

        const cookieToken = Cookies.get("token");

        if (!cookieToken) {
            console.error("El token no se encuentra en las cookies.");
            return;
        }

        const nuevoEstado = calcularEstado();

        const datosActualizados = {
            objetivos: user.objetivos || "",
            nivelActividad: user.nivelActividad || "",
            estado: nuevoEstado || estado,
            defaultToken: cookieToken
        };

        updateDatosPerfil(datosActualizados)
            .then(() => {
                //console.log("Perfil actualizado con el token");
                setPerfilActualizado(true);
                setEstado(nuevoEstado);
            })
            .catch((err) => {
                console.error("Error al actualizar el perfil:", err);
            });
    }, [user.peso, user.estatura, user.objetivos, user.nivelActividad, user.estado, perfilActualizado]); // Depende de atributos específicos

    return (
        <Container fluid className="body-inicio">
            <Row className="text-center mb-2">
                <Col>
                    <h1>Bienvenido a App Gym</h1>
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <Card className="info-card profile-card mb-2 animate-card">
                        <Card.Body>
                            <div className="text-center">
                                {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image" />}
                            </div>
                            <p className="text-black">Nivel: {user.nivel}</p>
                            <p className="text-black">Peso: {user.peso} kg</p>
                            <p className="text-black">Altura: {user.estatura} cm</p>
                            <p className="text-black">Edad: {user.edad} años</p>
                            <p className="text-black">Sexo: {user.genero}</p>
                            <p className="text-black">Objetivos: {user.objetivos}</p>
                            <p className="text-black">Nivel de Actividad: {user.nivelActividad}</p>
                            <p className="text-black">Estado (Indice de Masa Corporal): {calcularEstado()}</p>
                            <hr className="text-black my-4" />
                            <Button onClick={calcularTMB} variant="success" className="mt-3 my-2">
                                Calcular TMB (Tasa de Metabolismo Basal)
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
                                <p>Por favor, calcula primero tu TMB (Tasa de Metabolismo Basal).</p>
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
                                <p>Por favor, calcula primero tu TMB (Tasa de Metabolismo Basal).</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="mb-2">
                    <Card className="info-card animate-card mb-4">
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
                    <Card className="info-card animate-card mt-3 mb-4">
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
                    <PanelEjercicios />

                </Col>
            </Row>
        </Container>
    );
}
