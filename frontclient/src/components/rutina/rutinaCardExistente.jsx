import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/authcontext";
import axios from '../../api/axios';
import { useEffect, useState } from "react";

export function RutinaCardExistente({ rutina }) {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);

    const fetchExercises = async () => {
        try {
            const response = await axios.get(`/ejercicios/${user.nivel}`);
            setExercises(response.data);
        } catch (error) {
            console.error("Error al obtener los ejercicios", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (user?.nivel) {
            fetchExercises();
        }
    }, [user]);

    const isRecommended = ejercicios.nivel === user.nivel;

    return (
        <Card className="mb-4 text-black">
            <Card.Header>
                <h2 className="text-center">{`Rutina de ${rutina.categoria} (${rutina.nivel})`}</h2>
                {isRecommended ? (
                    <span className="text-white bg-green-800 px-2 py-1 rounded-lg text-sm">
                        Recomendado
                    </span>
                ) : (
                    <span className="text-white bg-red-800 px-2 py-1 rounded-lg text-sm">
                        No recomendado
                    </span>
                )}
            </Card.Header>
            <Card.Body>
                <ul>
                    {rutina.ejercicios.map((ejercicio, index) => (
                        <li key={index}>
                            <hr className="mb-2 mt-2" />
                            <h3 className="text-center">{ejercicio.nombre}</h3>
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
