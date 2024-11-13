import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { useRutinas } from '../../context/rutinascontext';
import { useProgreso } from '../../context/progresocontext';
import { getEjerciciosRequest } from '../../api/ejercicio';
import { useAuth } from '../../context/authcontext';
import '../../css/rutinaPage.css'; // Tu propio archivo CSS para personalizar el calendario
import { useDetallesRutina } from '../../context/detallerutinacontext';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const RutinaForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createRutina, getRutina, updateRutina } = useRutinas();
  const { createProgreso } = useProgreso();
  const { createDetalleRutina } = useDetallesRutina();
  const { user } = useAuth();

  const navigate = useNavigate();
  const params = useParams();

  const [selectedEjercicios, setSelectedEjercicios] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const res = await getEjerciciosRequest();
        setEjercicios(res.data);
      } catch (error) {
        console.error('Error al obtener ejercicios:', error);
      }
    };
    fetchEjercicios();
  }, []);

  useEffect(() => {
    async function loadRutina() {
      if (params.id) {
        const data = await getRutina(params.id);
        if (data && data.rutina) {
          setValue('nombre', data.rutina.nombre);
          setValue('descripcion', data.rutina.descripcion);
          setSelectedEjercicios(data.detalles.map(detalle => detalle.ejercicio._id));
        }
      }
    }
    loadRutina();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const { nombre, descripcion } = data;

    if (!nombre || !descripcion || selectedEjercicios.length === 0) {
      console.error("Faltan datos requeridos");
      return;
    }

    try {
      if (params.id) {
        const rutinaActualizada = {
          user: user._id,
          nombre,
          descripcion,
          totalEjercicios: selectedEjercicios.length,
          ejercicios: selectedEjercicios,
        };

        await updateRutina(params.id, rutinaActualizada);
        navigate('/rutinas');
      } else {
        const nuevaRutina = {
          user: user._id,
          nombre,
          descripcion,
          totalEjercicios: selectedEjercicios.length,
        };

        const rutinaCreada = await createRutina(nuevaRutina);

        const detallesRutina = selectedEjercicios.map(ejercicioId => ({
          rutina: rutinaCreada._id,
          ejercicio: ejercicioId,
          fecha: new Date(),
        }));

        await Promise.all(detallesRutina.map(detalle => createDetalleRutina(detalle)));

        const progresoData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
          estado: 'En Progreso'
        };

        await createProgreso(progresoData);
        navigate('/rutinas');
      }
    } catch (error) {
      console.error("Error al actualizar o crear la rutina:", error);
    }
  });

  const handleCheckboxChange = (ejercicioId) => {
    if (selectedEjercicios.includes(ejercicioId)) {
      setSelectedEjercicios(selectedEjercicios.filter(id => id !== ejercicioId));
    } else {
      setSelectedEjercicios([...selectedEjercicios, ejercicioId]);
    }
  };

  const filteredEjercicios = ejercicios.filter(ejercicio => ejercicio.nivel === user.nivel);

  return (
    <section className="seccion">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h3 className="text-center mb-4">Crea tu Rutina</h3>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label className='text-black'>Nombre de la rutina</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombre de la rutina"
                      {...register('nombre')}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="descripcion">
                    <Form.Label className='text-black'>Descripción</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Descripción"
                      {...register('descripcion')}
                      required
                    />
                  </Form.Group>

                  <Form.Label className="mb-2 text-black">Selecciona Ejercicios (Nivel: {user.nivel})</Form.Label>
                  <div className="mb-3">
                    {filteredEjercicios.map((ejercicio) => (
                      <Form.Check
                        key={ejercicio._id}
                        type="checkbox"
                        label={ejercicio.nombre}
                        value={ejercicio._id}
                        checked={selectedEjercicios.includes(ejercicio._id)}
                        onChange={() => handleCheckboxChange(ejercicio._id)}
                        className="text-muted"
                      />
                    ))}
                  </div>

                  <Alert variant="info" className="mt-4">
                    <strong>Ejercicios Seleccionados:</strong>
                    <ul className="m-0">
                      {selectedEjercicios.length === 0 ? (
                        <li>No has seleccionado ejercicios.</li>
                      ) : (
                        selectedEjercicios.map((id) => {
                          const ejercicioSeleccionado = ejercicios.find(ej => ej._id === id);
                          return (
                            <li key={id}>
                              {ejercicioSeleccionado.nombre} - Nivel: {ejercicioSeleccionado.nivel}
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </Alert>

                  <div className="d-grid">
                    <Button type="submit" variant="primary" className="rounded-pill mt-3">
                      Guardar Rutina
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default RutinaForm;
