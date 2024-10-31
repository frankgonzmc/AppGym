import { useForm } from "react-hook-form";
import '../../css/login.css';
import { useAuth } from "../../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imagenes/logo.png";
import { useEffect } from "react";

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
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="form">
        <h1 className="container1-title">APP GYM</h1>
        <div className="container1">
          <img src={logo} alt="Logo" className="img-logo" />
        </div>
        {signinErrors.map((error, i) => (
          <div className="error-message" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label className="form-label">
            <input
              type="email"
              {...register('email', { required: true })}
              placeholder="Ingrese el Email"
              className="container2-input"
            />
          </label>
          {errors.email && (<p className="text-red-500">Email es Necesario!</p>)}

          <label className="form-label">
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Ingrese el Password"
              className="container3-input"
            />
          </label>
          {errors.password && (<p className="text-red-500">Password es Necesario!</p>)}

          <button type="submit" className="container4-button1">Iniciar Sesion</button>
          <p className="flex gap-x-2 justify-between">
            <Link to="/forgot-password" className="text-sky-500">Olvidaste tu contraseña?</Link>
          </p>
        </form>
        <hr className="text-white" />
        <p className="flex gap-x-2 justify-between text-white">
          No tienes una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export const LoginPage = () => {
  return (
    <section className="body">
      <FormularioSesion />
    </section>
  );
};
