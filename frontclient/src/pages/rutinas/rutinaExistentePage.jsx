import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "../../css/rutinaPage.css";

function RutinaExistentePage() {
  const { user } = useAuth();

  return (
    <section className='seccion'>
      <Container className="py-4">
        <h2 className="text-center mb-4">Rutinas Disponibles para los Usuarios</h2>
        <Row className="g-4">
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 1</h1>
              <p className="mb-4">Descripción de la rutina 1</p>
              <p className='mb-4'>Nivel: Principiante</p>
              <p> Ejercicios Existentes</p>
              <p>
                <li>
                  ejercicio 2, 3,4,5, 5,6
                </li>
                <li>
                  ejejecircicio ,4,4,2,21,2
                </li>
              </p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 2</h1>
              <p className="mb-4">Descripción de la rutina 2</p>
              <p className='mb-4'>Nivel: Principiante</p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 1</h1>
              <p className="mb-4">Descripción de la rutina 3</p>
              <p className='mb-4'>Nivel: Intermedio</p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 2</h1>
              <p className="mb-4">Descripción de la rutina 4</p>
              <p className='mb-4'>Nivel: Intermedio</p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 1</h1>
              <p className="mb-4">Descripción de la rutina 5</p>
              <p className='mb-4'>Nivel: Avanzado</p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
          <Col md={6} className="text-center">
            <Card className="p-4">
              <h1 className="font-bold">Rutina 2</h1>
              <p className="mb-4">Descripción de la rutina 6</p>
              <p className='mb-4'>Nivel: Avanzado</p>
              <Button variant="primary" className="mt-4">
                Iniciar Rutina
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RutinaExistentePage;
