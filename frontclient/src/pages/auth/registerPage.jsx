import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import { ErrorAlert } from "../../components/errorAlert";
import fondo from "../../imagenes/registerfondo.jpg";
import '../../css/register.css';
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function RegistroUsuario() {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm(); // Renombrado a `formErrors`
  const { signup, isAuthenticated, errors: authErrors } = useAuth(); // Renombrado a `authErrors`
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/inicio");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
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
            <ErrorAlert errors={authErrors} /> {/* Mostrar errores de autenticación */}
            <Form onSubmit={onSubmit} className="form-register">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nombre Completo"
                  {...register('username', { required: "Nombre Completo es necesario" })}
                />
                {formErrors.username && <span className="error-text">{formErrors.username.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register('email', { required: "Email es necesario" })}
                />
                {formErrors.email && <span className="error-text">{formErrors.email.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: "Password es necesario" })}
                />
                {formErrors.password && <span className="error-text">{formErrors.password.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Select {...register('genero', { required: "Género es necesario" })}>
                  <option value="">Seleccionar Género</option>
                  <option value="varon">Varón</option>
                  <option value="mujer">Mujer</option>
                  <option value="otro">Otro</option>
                </Form.Select>
                {formErrors.genero && <span className="error-text">{formErrors.genero.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Edad"
                  {...register('edad', { required: "Edad es necesaria" })}
                />
                {formErrors.edad && <span className="error-text">{formErrors.edad.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Estatura"
                  step="0.01"
                  min={0.5}
                  max={3}
                  {...register('estatura', { required: "Estatura es necesaria" })}
                />
                {formErrors.estatura && <span className="error-text">{formErrors.estatura.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="Peso"
                  step="0.01"
                  min={1}
                  max={200}
                  {...register('peso', { required: "Peso es necesario", min: 1, max: 200 })}
                />
                {formErrors.peso && <span className="error-text">{formErrors.peso.message}</span>}
              </Form.Group>

              <Form.Control type="hidden" value="Principiante" {...register('nivel')} />

              <Button variant="success" type="submit" className="w-100 mt-3">
                Continuar Registro
              </Button>
            </Form>
            <p className="footer-text mt-3">
              ¿Ya tienes una cuenta? <Link to="/login" className="link-login">Inicia sesión</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default RegistroUsuario;
