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
              <strong>{ejercicio.nombre}:</strong> {ejercicio.descripcion}
              <strong>Nivel: {ejercicio.nivel}</strong>
              <strong>series: {ejercicio.series}</strong>
              <strong>Duracion: {ejercicio.duracion}</strong>
              <strong>Repeticiones: {ejercicio.repeticiones}</strong>
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
