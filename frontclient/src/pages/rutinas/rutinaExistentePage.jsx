import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/authcontext";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import "../../css/rutinaPage.css";

function RutinaExistentePage() {
  const { user } = useAuth();

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Rutinas Disponibles</h2>
      <Row className="g-4">

      </Row>
    </Container>
  );
}

export default RutinaExistentePage;
