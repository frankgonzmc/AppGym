import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import fondo from "../../imagenes/magym.jpg";
import '../../css/register.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";


function RegistroUsuario() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navegar = useNavigate();
  const nivel = "Principiante"; // Define el nivel por defecto

  useEffect(() => {
    if (isAuthenticated) {
      navegar("/inicio")
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  })

  return (
    <section className="section-register">
      <div className="container-form">
        <div className="information">
          <div className="info-childs">
            <img src={fondo} alt="Fondo" />
            <h2 className="info-childs-h2">Bienvenido</h2>
            <p className="info-childs-p">Para unirte a nuestra comunidad por favor Registrate.</p>
          </div>
        </div>
        <div className="form-information">
          <div className="form-information-childs">
            <h2 className="form-information-childs-h2">Crear una Cuenta</h2>
            {
              registerErrors.map((error, i) => (
                <div className="bg-red-500 p-2 text-while" key={i}>
                  {error}
                </div>
              ))
            }
            <Form onSubmit={onSubmit} className="form-register">
              <label
                className="form-label"> <input type="text" {...register('username', { required: true })} placeholder="Nombre Completo" className="w-full text-black px-4 py-2 rounded-md my-2" />
              </label>
              {errors.username && (<p className="text-red-500">El Nombre Completo es Necesario!</p>)}
              <label
                className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Email" className="w-full text-black px-4 py-2 rounded-md my-2" />
              </label>
              {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}
              <label
                className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="w-full text-black px-4 py-2 rounded-md my-2" />
              </label>
              {errors.password && (<p className="text-red-500"> Password es Necesario! </p>)}
              <label
                className="form-label"><input type="number" {...register('edad', { required: true })} placeholder="Edad" className="w-full text-black px-4 py-2 rounded-md my-2" />
              </label>
              {errors.edad && (<p className="text-red-500"> Edad es Necesario! </p>)}

              <label
                className="form-label"><input type="number" {...register('estatura', { required: true })} placeholder="Estatura" className="w-full text-black px-4 py-2 rounded-md my-2" step="0.01" />
              </label>
              {errors.estatura && (
                <p className="text-red-500">
                  {errors.estatura.type === "required" && "Estatura es Necesario!"}
                  {errors.estatura.type === "min" && "La estatura no puede ser negativa!"}
                  {errors.estatura.type === "max" && "La estatura debe ser menor a 3 metros!"}
                </p>
              )}

              <label
                className="form-label"><input type="number" {...register('peso', { required: true })} placeholder="Peso" className="info-childs-input text-black" step="0.01" />
              </label>
              {errors.peso && (
                <p className="text-red-500">
                  {errors.peso.type === "required" && "Peso es Necesario!"}
                  {errors.peso.type === "min" && "El Peso no puede ser negativo!"}
                  {errors.peso.type === "max" && "El Peso debe ser menor a 120 kg!"}
                </p>
              )}

              <input type="hidden" {...register('nivel')} value={nivel} />
              <button type="submit" className="btn btn-success mt-2 my-2">Continuar Registrar</button>
            </Form>

            <p className="flex gap-x-2 justify-between text-white mt-2 my-2">
              Ya tienes una cuenta? <Link to="/login" className="text-sky-500">ve a Iniciar Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistroUsuario;


/*

import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';

function RegistroUsuario() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navegar = useNavigate();
  const nivel = "Principiante";

  useEffect(() => {
    if (isAuthenticated) {
      navegar("/inicio");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <Container className="section-register">
      <Row>
        <Col md={6} className="information">
          <img src={fondo} alt="Fondo" className="img-fluid" />
          <h2>Bienvenido</h2>
          <p>Para unirte a nuestra comunidad, por favor regístrate.</p>
        </Col>
        <Col md={6} className="form-information">
          <h2>Crear una Cuenta</h2>
          {registerErrors.map((error, i) => (
            <Alert variant="danger" key={i}>{error}</Alert>
          ))}
          <Form onSubmit={onSubmit} className="form-register">
            <Form.Group controlId="username">
              <Form.Control type="text" placeholder="Nombre Completo" {...register('username', { required: true })} />
              {errors.username && <Form.Text className="text-danger">El Nombre Completo es Necesario!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control type="email" placeholder="Email" {...register('email', { required: true })} />
              {errors.email && <Form.Text className="text-danger">Email es Necesario!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
              {errors.password && <Form.Text className="text-danger">Password es Necesario!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="edad">
              <Form.Control type="number" placeholder="Edad" {...register('edad', { required: true })} />
              {errors.edad && <Form.Text className="text-danger">Edad es Necesario!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="estatura">
              <Form.Control type="number" placeholder="Estatura" {...register('estatura', { required: true })} step="0.01" />
              {errors.estatura && <Form.Text className="text-danger">Estatura es Necesario!</Form.Text>}
            </Form.Group>
            <Form.Group controlId="peso">
              <Form.Control type="number" placeholder="Peso" {...register('peso', { required: true })} step="0.01" />
              {errors.peso && <Form.Text className="text-danger">Peso es Necesario!</Form.Text>}
            </Form.Group>
            <input type="hidden" {...register('nivel')} value={nivel} />
            <Button type="submit" className="btn btn-success">Continuar Registrar</Button>
          </Form>
          <p className="mt-3">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Ve a Iniciar Sesión</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default RegistroUsuario;

*/