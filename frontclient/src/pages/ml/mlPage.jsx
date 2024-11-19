import { useState, useEffect } from "react";
import { useAuth } from "../../context/authcontext";
import { sendUserDataRequest } from "../../api/auth";
import { Container, Form, Row, Col, Card, Button, Alert, Table } from 'react-bootstrap';
import axios from '../../api/axios';

export default function mlPage() {
    const { user } = useAuth();
    const [peso, setPeso] = useState(user.peso || "");
    const [altura, setAltura] = useState(user.estatura || "");
    const [edad, setEdad] = useState(user.edad || "");
    const [genero, setGenero] = useState(user.genero || "");
    const [tmb, setTmb] = useState(null);
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [objetivo, setObjetivo] = useState(user.objetivos || "");
    const [textareaContent, setTextareaContent] = useState(""); // Estado para el textarea
    const [recomendacionIA, setRecomendacionIA] = useState(""); // Estado para la respuesta del API
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRecomendaciones();
    }, [user]);

    const fetchRecomendaciones = async () => {
        try {
            const response = await axios.get(`/recomendaciones/${user.id}`);
            setRecomendaciones(response.data);
        } catch (error) {
            console.error("Error al obtener recomendaciones:", error);
            setError("No se pudieron cargar las recomendaciones.");
        }
    };

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

    const calcularNutrientesDefinir = () => {
        if (tmb) {
            const totalCalorias = tmb - 500; // tmb es el resultado calculado
            const proteinas = (totalCalorias * 0.20) / 4; // 20% de proteínas
            const grasas = (totalCalorias * 0.25) / 9; // 25% de grasas
            const hidratos = (totalCalorias * 0.55) / 4; // 55% de carbohidratos

            return {
                proteinas: proteinas.toFixed(2),
                grasas: grasas.toFixed(2),
                hidratos: hidratos.toFixed(2)
            };
        }
        return null;
    };

    const calcularNutrientesVolumen = () => {
        if (tmb) {
            const totalCalorias = tmb + 500; // tmb es el resultado calculado
            const proteinas = (totalCalorias * 0.20) / 4; // 20% de proteínas
            const grasas = (totalCalorias * 0.25) / 9; // 25% de grasas
            const hidratos = (totalCalorias * 0.55) / 4; // 55% de carbohidratos

            return {
                proteinas: proteinas.toFixed(2),
                grasas: grasas.toFixed(2),
                hidratos: hidratos.toFixed(2)
            };
        }
        return null;
    };

    const enviarDatosUsuario = async () => {
        const queryParams = `${altura} metros, ${peso} kilogramos, ${genero}, ${objetivo}`;
        const content = textareaContent || "Genera una dieta recomendada para mi.";

        try {
            const response = await axios.get('/dieta', {
                params: { content: queryParams + ", " + content },
            });

            setRecomendacionIA(response.data.respuesta);
            setError("");
        } catch (error) {
            console.error("Error al enviar datos al servidor:", error.response?.data || error.message);
            setError("No se pudo obtener la recomendación. Inténtalo de nuevo.");
        }
    };

    const nutrientedefinir = calcularNutrientesDefinir();
    const nutrientesVolumen = calcularNutrientesVolumen();

    const prediccion = "* Mejorar resistencia cardiovascular *";

    return (
        <Container>
            <Row>
                <Col md={12} className="text-center mt-4 mb-2 animate-card">
                    <Card className="p-4 shadow">
                        <Card.Title className="mb-4">Recomendación de alimentación con IA</Card.Title>
                        <p>Pide una dieta de alimentación para hoy o toda la semana</p>
                        <Form>
                            <Form.Group controlId="dietRequest">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ejemplo: quiero la dieta del día de hoy"
                                    value={textareaContent}
                                    onChange={(e) => setTextareaContent(e.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>
                            <Button onClick={enviarDatosUsuario} variant="primary" className="mt-3 w-50 align-self-center">
                                Enviar
                            </Button>
                        </Form>
                        <hr className="my-4" />
                        <div className="text-left">
                            <h5>Para tu objetivo de ( {objetivo} ), te recomendaría la siguiente dieta:</h5>
                            {recomendacionIA ? (
                                <div>
                                    <p>{recomendacionIA}</p>
                                </div>
                            ) : (
                                <p>No hay recomendaciones disponibles en este momento. Completa el formulario para generar una.</p>
                            )}
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </div>
                    </Card>
                </Col>
                <hr className="text-black my-2 mt-2" />
                <Col md={6} className="text-center mb-2">
                    <Card className="info-card mt-3 my-3">
                        <Card.Body>
                            <Card.Title>¿recomendaciones de rutinas para ejercicios?</Card.Title>
                            <p>
                                ¡No te pierdas la oportunidad de mejorar tus habilidades!
                                ¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!
                            </p>
                            <p> esta es tu predicción en base a tus objetivos ({user.objetivos}) y segun tu nivel de actividad actual {user.nivelActividad} seleccionados  para tus rutinas de ejercicios y rutina de alimentación: ({prediccion})</p>
                        </Card.Body>
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
                                    <Form.Label className='text-black'>Peso (kg)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={peso}
                                        onChange={(e) => setPeso(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="altura">
                                    <Form.Label className='text-black'>Altura (cm)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={altura}
                                        onChange={(e) => setAltura(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="edad">
                                    <Form.Label className='text-black'>Edad (años)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={edad}
                                        onChange={(e) => setEdad(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="genero">
                                    <Form.Label className='text-black'>Genero</Form.Label>
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
                                    Si quieres sacar tu Gasto Energetico Total(GET) es: {tmb.toFixed(2)} Kcal/día deberás multiplicarlo por el nivel de actividad actual que tienes.
                                </Alert>
                            )}
                        </Card.Body>

                        {/* Tabla de 2x6 */}
                        <Card.Body>
                            <Card.Title>TABLA DE NIVEL DE ACTIVIDAD</Card.Title>
                            <p>
                                La tabla de nivel de actividad es una tabla que te ayudará a determinar el multiplicador que debes multiplicar tu Gasto Energético Total(GET) para obtener tu Tasa de Metabolismo Basal(TMB).
                            </p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Factor de actividad Multiplicador</th>
                                        <th>Nivel de Actividad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1.2</td>
                                        <td>Información sobre la tasa de metabolismo basal.</td>
                                    </tr>
                                    <tr>
                                        <td>1.375</td>
                                        <td>Importancia de la actividad física diaria.</td>
                                    </tr>
                                    <tr>
                                        <td>1.55</td>
                                        <td>Consejos para una dieta equilibrada.</td>
                                    </tr>
                                    <tr>
                                        <td>1.725</td>
                                        <td>Beneficios de mantenerse hidratado.</td>
                                    </tr>
                                    <tr>
                                        <td>1.9</td>
                                        <td>Recomendaciones para mejorar la salud mental.</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    <Card className="info-card mt-3">
                        <Card.Body>
                            <Card.Title>Recomendaciones de Alimentaciones para *DEFINIR*</Card.Title>
                            {tmb ? (
                                <>
                                    <p>
                                        Tus Kcal/día son: {tmb.toFixed(2)} Kcal
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
                                        Tus Kcal/día son: {tmb.toFixed(2)} Kcal
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
                <Col md={6} className="mb-2">
                    <Card className="info-card animate-card mt-3 mb-4">
                        <Card.Body>
                            <Card.Title>Recomendaciones de Ejercicios</Card.Title>
                            {recomendaciones.length > 0 ? (
                                recomendaciones.map((rec, index) => (
                                    <p key={index}>{rec.ejercicio.nombre} - {rec.motivo}</p>
                                ))
                            ) : (
                                <p>No hay recomendaciones disponibles en este momento.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
