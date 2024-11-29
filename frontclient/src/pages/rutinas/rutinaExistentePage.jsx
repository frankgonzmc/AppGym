import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../../css/rutinaPage.css";
import { RutinaCardExistente } from "../../components/rutina/rutinaCardExistente";
import axios from "axios";
import { generadorRutinas } from "../../components/generadorRutinas";

function RutinaExistentePage() {
  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get("/api/ejercicios"); // Ajusta la ruta según tu backend
        const ejercicios = response.data;
        const rutinasGeneradas = generadorRutinas(ejercicios);
        setRutinas(rutinasGeneradas);
      } catch (error) {
        console.error("Error al obtener ejercicios:", error.message);
      }
    };

    fetchEjercicios();
  }, []);

  return (
    <section className="seccion">
      <Container className="py-4">
        <h2 className="text-center mb-4">Rutinas Disponibles</h2>
        <div className="row">
          {rutinas.map((rutina, index) => (
            <div className="col-md-4" key={index}>
              <RutinaCardExistente rutina={rutina} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default RutinaExistentePage;
