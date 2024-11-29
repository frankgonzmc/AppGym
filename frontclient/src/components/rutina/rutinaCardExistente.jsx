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
              <strong>{ejercicio.nombre}:</strong> {ejercicio.descripcion}.
              <br />
              <strong>Nivel: {ejercicio.nivel}.</strong>
              <br />
              <strong>series: {ejercicio.series} veces.</strong>
              <br />
              <strong>Duracion: {ejercicio.duracion} segundos.</strong>
              <br />
              <strong>Repeticiones: {ejercicio.repeticiones} veces.</strong>
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
