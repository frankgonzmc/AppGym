import React from 'react'
import { useAuth } from "../../context/authcontext";
import { Container, Form, Row, Col, Card, Button, Alert } from 'react-bootstrap';

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
                        </Card.Body>
                        <Card.Body>
                            <Card.Title>¿¿Quieres empezar una Dieta??</Card.Title>
                            <p>
                                Empieza hacer Dieta mediante tus objetivos si tu quieres tener un cuerpo *DEFINIDO* y saludable. Sigue estas instruciones para empezar tu dieta.
                            </p>
                            <p>
                                Empieza hacer Dieta mediante tus objetivos si tu quieres tener un cuerpo en *VOLUMEN* y saludable. Sigue estas instruciones para empezar tu dieta.
                            </p>
                            <p>
                                En nuestro diccionario de nutrición explicamos que las calorías es la unidad que utilizamos para medir la energía que consume e ingresa nuestro cuerpo. Si quieres saber calcular calorías, antes conviene que tengas en cuenta una cosa. Como dijimos debemos hablar de Kcal y no de Calorías, así que en adelante nos referiremos a Kcal.

                                Calcular kilocalorías
                                ¿Qué necesitas para hacer el cálculo? Lo primero de todo una calculadora. Y haremos el cálculo en 2 fases.

                                El primer cálculo que debemos realizar es el del gasto de nuestro metabolismo basal que explicamos en el artículo metabolismo basal. La forma más exacta de conocer cuánto gasta nuestro metabolismo basal es, tal como explicamos en el vídeo, mediante una calorimetría. Pero como es un método complejo y costoso, en la práctica diaria, lo mejor es recurrir a fórmulas teóricas aproximativas. Decimos que son aproximativas porque se ha llegado a ellas estudiando a muchos individuos realizándoles calorimetrías.

                                Fórmula para calcular calorías
                                Existen varias fórmulas para hacer el cálculo. Te recomendamos escoger una que tenga en cuenta el máximo de parámetros posibles, es decir, género, peso, talla y edad. Por cierto, los Dietistas-Nutricionistas hablamos de talla para referirnos a la altura. Aun así, siguen siendo aproximativas, ya que no tienen en cuenta la composición corporal. Es decir, la cantidad de grasa y músculo que tenemos. Por eso, si te encuentras en una de estas 3 situaciones:

                                Bajo peso
                                Cantidad elevada de grasa corporal
                                Cantidad elevada de músculo esquelético (el músculo que se encuentra junto al esqueleto, sin tener en cuenta las vísceras)
                                Tu Dietista-Nutricionista decidirá cuál es la mejor forma para determinar cuál es el gasto de tu metabolismo basal.
                            </p>
                            <p>
                                Fórmula de Harris-Benedict
                                Como decíamos existen varias fórmulas teóricas para calcular tu tasa de metabolismo basal. Vamos a enseñarte a calcular tu gasto energético basal a partir de una fórmula que tenga en cuenta el mayor número de variables posibles, es decir: género, peso, talla y edad. Y que es la que se utiliza más habitualmente: fórmula de Harris-Benedict. La fórmula es la siguiente:

                                Mujeres:             655 + (9.6 x P) + (1.8 x T) – (4.7 x E)

                                Hombres:           66 + (13.7 x P) + (5 x T) – (6.8 x E)

                                En las fórmulas P es el peso en Kg, T es la talla (altura) en cm y E es la edad en años. Puede parecer una tontería o muy obvio, pero tener claras las unidades es muy importante. Así que insistimos:

                                P = Peso en Kg
                                T = Talla (altura) en cm
                                E = Edad en años
                                Ojo porque podemos encontrar la fórmula de Harris-Benedict con alguna pequeña diferencia en los decimales. Es indistinto, la diferencia no es importante. Como decíamos antes, no buscamos un número exacto y preciso que debamos cumplir a rajatabla. Buscamos una orientación. Una aproximación a cuál es nuestro gasto energético basal.

                                Así pues, vamos con un ejemplo partiendo de Harris-Benedict: si tenemos una mujer que pesa 52 kg, mide 1,62 m (es decir, 162 cm) y tiene 38 años. Haremos lo siguiente:

                                Mujeres:             655 + (9.6 x P) + (1.8 x T) – (4.7 x E)

                                Mujeres:             655 + (9.6 x 52) + (1.8 x 162) – (4.7 x 38)

                                Es preferible que uses una calculadora científica, pero si no la tienes, resuelve primero los paréntesis:

                                Mujeres:             655 + (499.2) + (291.6) - (178.6)  =  1267.2 Kcal/día

                                Ahora que ya tenemos el gasto energético basal o tasa de metabolismo basal, vamos a calcular el total de Kilocal necesarias para todo un día en nuestro ejemplo.
                            </p>
                            <p>
                                Calcular metabolismo basal
                                Cuando calculamos el gasto del metabolismo basal nos referimos a:

                                Tasa del metabolismo basal (TMB)
                                Gasto energético basal (GEB)
                                Gasto energético en reposo (GER)
                                Las utilizamos indistintamente, si bien en realidad no son exactamente lo mismo, pero en la práctica diaria marca poco o nada la diferencia.

                                Como siempre decimos, en nutrición 2+2 nunca suman 4, y pretender la perfección es imposible porque no existe. Así que buscar el número exacto, preciso y milimetrado de nuestro gasto tampoco es el objetivo porque no vale la pena.
                            </p>
                            <p>
                                Valor por actividad física
                                Por ahora, una de las tablas de valores para la actividad física que podemos utilizar es la de la FAO/OMS y que dice así:

                                Muy Ligera	1.2	Alguien sedentario que además no practica ejercicio físico
                                Ligera	1.375	Alguien sedentario que practica ejercicio físico entre 1 y 3 veces por semana
                                Moderada	1.55	Alguien con un trabajo con cierta actividad, como por ejemplo alguien que tiene que ir andando durante su jornada, o que se dedica a la limpieza, o que trabaja cargando peso… y además practica ejercicio físico entre 3 y 5 veces por semana
                                Activa	1.725	Alguien con un trabajo físico como por ejemplo en la construcción, y además practica deporte 6-7 veces por semana
                                Muy activa	1.9	Alguien que se dedica al deporte y lo practica mínimo 2 horas todos los días
                                Si nuestro caso es alguien que trabaja de pie y que 1 día a la semana sale a correr, escogeremos un factor de actividad ligero. Entonces, a partir del resultado del TMB, haremos lo siguiente:

                                GET = TMB x FA = 1267.2 x 1.375 = 1742.4 Kcal/día

                                El gasto energético total, es decir diario, de nuestro ejemplo es de 1742 Kcal. Incluso te recomendamos redondear, por todo lo dicho antes, a 1740 Kcal. De hecho, pretender comer cada día exactamente 1740 Kcal, no solo no es nada recomendable porque nos llevaría a obsesionarnos y a tener que estar calculando todo el tiempo, sino que es imposible si queremos seguir una alimentación saludable, y por lo tanto, variada. Un día serán 1752 Kcal, otro día 1737 Kcal, otro día 1760 Kcal… lo importante es tener una cifra que nos oriente para saber por dónde debemos movernos.
                            </p>
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
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
