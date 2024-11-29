import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import { ErrorAlert } from "../../components/alerts/errorAlert";
import fondo from "../../imagenes/registerfondo.jpg";
import '../../css/register.css';
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function RegistroUsuario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    // Convertimos los valores numéricos a su tipo correcto antes de enviarlos
    const formData = {
      ...values,
      edad: parseInt(values.edad, 10),
      estatura: parseFloat(values.estatura),
      peso: parseFloat(values.peso),
    };

    console.log("Datos enviados al backend:", formData); // Verificar los datos en la consola
    signup(formData);
  });

  return (
    <section className="section-register">
      <Container className="container-form shadow-lg rounded">
        <Row>
          <Col md={6} className="information text-white p-4">
            <h2>BIENVENIDO</h2>
            <img src={fondo} alt="Fondo de Registro" className="info-image mb-2" />
            <p>Para unirte a nuestra comunidad, por favor regístrate.</p>
          </Col>
          <Col md={6} className="form-information text-white p-4">
            <h2 className="mt-3 mb-4">Crear una Cuenta</h2>
            <ErrorAlert errors={errors} /> {/* Muestra errores aquí */}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Ingresa tu email"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edad</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  onChange={handleChange}
                  placeholder="Ingresa tu edad"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Género</Form.Label>
                <Form.Select name="gender" onChange={handleChange}>
                  <option value="Varón">Varón</option>
                  <option value="Mujer">Mujer</option>
                </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-4">
                Continuar Registro
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RegistroUsuario;
