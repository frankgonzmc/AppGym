import React from "react";
import { Card, Button } from "react-bootstrap";

export function RutinaCardExistente({ rutina }) {
    return (
        <Card className="mb-4 text-black">
            <Card.Header>
                <h2 className="text-center">{`Rutina de ${rutina.categoria} (${rutina.nivel})`}</h2>
            </Card.Header>
            <Card.Body>
                <ul>
                    {rutina.ejercicios.map((ejercicio, index) => (
                        <li key={index}>
                            <hr className="mb-2 mt-2" />
                            <h3 className="text-center">{ejercicio.nombre}</h3>.
                            <br />
                            <strong>Nivel:</strong> {ejercicio.nivel}.
                            <br />
                            <strong>series:</strong> {ejercicio.series} veces.
                            <br />
                            <strong>Duracion:</strong>  {ejercicio.duracion} segundos.
                            <br />
                            <strong>Repeticiones:</strong>  {ejercicio.repeticiones} veces.
                        </li>
                    ))}
                </ul>
            </Card.Body>
            <Card.Footer className="text-center">
                <Button variant="primary">Iniciar Rutina</Button>
            </Card.Footer>
        </Card>
    );
}
