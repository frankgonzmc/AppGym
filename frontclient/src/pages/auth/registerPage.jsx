import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import fondo from "../../imagenes/registerfondo.jpg";
import '../../css/register.css';
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function RegistroUsuario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const nivel = "Principiante";

  useEffect(() => {
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <section className="section-register">
      <Container className="container-form shadow-lg rounded">
        <Row>
          <Col md={6} className="information d-flex flex-column align-items-center justify-content-center text-center text-white p-4">
            <h2>BIENVENIDO</h2>
            <img src={fondo} alt="Fondo de Registro" className="info-image mb-2" />
            <p>Para unirte a nuestra comunidad, por favor regístrate.</p>
          </Col>

          <Col md={6} className="form-information d-flex flex-column justify-content-center text-white p-4">
            <h2>Crear una Cuenta</h2>
            {registerErrors.map((error, i) => (
              <div key={i} className="error-message mb-2">{error}</div>
            ))}
            <Form onSubmit={onSubmit} className="form-register">
              <Form.Group>
                <Form.Control type="text" placeholder="Nombre Completo" {...register('username', { required: "Nombre Completo es necesario" })} />
                {errors.username && <span className="error-text">{errors.username.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control type="email" placeholder="Email" {...register('email', { required: "Email es necesario" })} />
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control type="password" placeholder="Password" {...register('password', { required: "Password es necesario" })} />
                {errors.password && <span className="error-text">{errors.password.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Select {...register('genero', { required: "Género es necesario" })}>
                  <option value="">Seleccionar Género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </Form.Select>
                {errors.genero && <span className="error-text">{errors.genero.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control type="number" placeholder="Edad" {...register('edad', { required: "Edad es necesario" })} />
                {errors.edad && <span className="error-text">{errors.edad.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control type="number" placeholder="Estatura" step="0.01" {...register('estatura', { required: "Estatura es necesaria", min: 0.5, max: 3 })} />
                {errors.estatura && <span className="error-text">{errors.estatura.message}</span>}
              </Form.Group>

              <Form.Group>
                <Form.Control type="number" placeholder="Peso" step="0.01" {...register('peso', { required: "Peso es necesario", min: 1, max: 120 })} />
                {errors.peso && <span className="error-text">{errors.peso.message}</span>}
              </Form.Group>

              <Form.Control type="hidden" {...register('nivel')} value={nivel} />

              <Button variant="success" type="submit" className="w-100 mt-3">Continuar Registro</Button>
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
