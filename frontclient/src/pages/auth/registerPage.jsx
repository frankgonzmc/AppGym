import { useForm } from "react-hook-form";
import { useAuth } from "../../context/authcontext";
import fondo from "../../imagenes/registerfondo.jpg";
import '../../css/register.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

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
      <div className="container-form">
        <div className="information">
          <div className="info-childs">
            <h2 className="item-center">BIENVENIDO</h2>
            <img src={fondo} alt="Fondo de Registro" className="info-image item-center w-full mt-2" />
            <p className="item-center mt-2">Para unirte a nuestra comunidad, por favor regístrate.</p>
          </div>
        </div>

        <div className="form-information">
          <div className="form-information-childs">
            <h2>Crear una Cuenta</h2>
            {registerErrors.map((error, i) => (
              <div key={i} className="error-message">
                {error}
              </div>
            ))}
            <Form onSubmit={onSubmit} className="form-register">
              <label className="form-label">
                <input type="text" {...register('username', { required: "Nombre Completo es necesario" })} placeholder="Nombre Completo" />
                {errors.username && <span className="error-text">{errors.username.message}</span>}
              </label>

              <label className="form-label">
                <input type="email" {...register('email', { required: "Email es necesario" })} placeholder="Email" />
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </label>

              <label className="form-label">
                <input type="password" {...register('password', { required: "Password es necesario" })} placeholder="Password" />
                {errors.password && <span className="error-text">{errors.password.message}</span>}
              </label>

              <label className="form-label">
                <input type="number" {...register('edad', { required: "Edad es necesario" })} placeholder="Edad" />
                {errors.edad && <span className="error-text">{errors.edad.message}</span>}
              </label>

              <label className="form-label">
                <input type="number" {...register('estatura', { required: "Estatura es necesaria", min: 0.5, max: 3 })} placeholder="Estatura" step="0.01" />
                {errors.estatura && <span className="error-text">{errors.estatura.message}</span>}
              </label>

              <label className="form-label">
                <input type="number" {...register('peso', { required: "Peso es necesario", min: 1, max: 120 })} placeholder="Peso" step="0.01" />
                {errors.peso && <span className="error-text">{errors.peso.message}</span>}
              </label>

              <input type="hidden" {...register('nivel')} value={nivel} />

              <button type="submit" className="btn btn-success">Continuar Registro</button>
            </Form>

            <p className="footer-text">
              ¿Ya tienes una cuenta? <Link to="/login" className="link-login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistroUsuario;
