import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imagenes/logo.png";
import { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

export function Inicio() {
  return (
    <Container className="text-center my-4">
      <h1 className="container1-title">APP GYM</h1>
      <img src={logo} alt="Logo" className="img-logo" />
    </Container>
  );
}

export function FormularioSesion() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio');
  }, [isAuthenticated]);

  return (
    <Container className="d-flex justify-content-center align-items-center h-100">
      <div className="form">
        {signinErrors.map((error, i) => (
          <div className="error-message" key={i}>
            {error}
          </div>
        ))}
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', { required: true })}
              placeholder="Ingrese el Email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              Email es necesario!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', { required: true })}
              placeholder="Ingrese el Password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              Password es necesario!
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success" className="w-100">Iniciar Sesión</Button>
          <p className="mt-3">
            <Link to="/forgot-password" className="text-sky-500">Olvidaste tu contraseña?</Link>
          </p>
        </Form>
        <hr className="text-white" />
        <p className="text-white">
          No tienes una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </div>
    </Container>
  );
}

export const LoginPage = () => {
  return (
    <section className="body">
      <Inicio />
      <FormularioSesion />
    </section>
  );
};
