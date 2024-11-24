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
import { showSuccessAlert, showErrorAlert } from '../../components/alerts/utils-alerts';

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
        //console.error('Error al obtener ejercicios:', error);
        showErrorAlert('Error', 'No se pudieron cargar los ejercicios.');
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
      showErrorAlert('Datos incompletos', 'Por favor completa todos los campos y selecciona ejercicios.');
      return;
    }

    try {
      if (params.id) {
        // Actualizar rutina existente
        const rutinaActualizada = {
          user: user._id,
          nombre,
          descripcion,
          totalEjercicios: selectedEjercicios.length, // Número total de ejercicios seleccionados
        };

        await updateRutina(params.id, rutinaActualizada);

        // Actualiza los detalles asociados
        //await DetallesRutinas.deleteMany({ rutina: params.id }); // Borra detalles anteriores
        const nuevosDetalles = selectedEjercicios.map((ejercicioId) => ({
          rutina: params.id,
          ejercicio: ejercicioId,
          fecha: new Date(),
        }));
        await Promise.all(nuevosDetalles.map((detalle) => createDetalleRutina(detalle)));

        showSuccessAlert('Rutina Actualizada', 'Tu rutina se ha actualizado exitosamente.');
        navigate('/rutinas');
      } else {
        // Crear nueva rutina
        const nuevaRutina = {
          user: user._id,
          nombre,
          descripcion,
          totalEjercicios: selectedEjercicios.length, // Asegúrate de enviar el número total
        };

        const rutinaCreada = await createRutina(nuevaRutina);

        // Crear detalles asociados
        const detallesRutina = selectedEjercicios.map((ejercicioId) => ({
          rutina: rutinaCreada._id,
          ejercicio: ejercicioId,
          fecha: new Date(),
        }));

        await Promise.all(detallesRutina.map((detalle) => createDetalleRutina(detalle)));

        // Crear progreso asociado
        const progresoData = {
          user: user._id,
          rutina: rutinaCreada._id,
          fecha: new Date(),
        };

        await createProgreso(progresoData);

        showSuccessAlert('Rutina Creada', 'Tu rutina se ha creado exitosamente.');
        navigate('/rutinas');
      }
    } catch (error) {
      console.error('Error al actualizar o crear la rutina:', error);
      showErrorAlert('Error', 'Ocurrió un problema al guardar la rutina. Inténtalo de nuevo.');
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
