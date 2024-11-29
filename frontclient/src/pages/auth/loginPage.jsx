import { useForm } from "react-hook-form";
import '../../css/login.css';
import { useAuth } from "../../context/authcontext";
import { ErrorAlert } from "../../components/errorAlert";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imagenes/logo.png";
import { useEffect } from "react";
import { showSuccessAlert, showErrorAlert } from '../../components/alerts/utils-alerts';

export function Inicio() {
  return (
    <section className="items-center justify-center">
      <h1 className="container1-title text-center">APP GYM</h1>
      <div className="container1">
        <img src={logo} alt="Logo" className="img-logo" />
      </div>
    </section>
  );
}

export function FormularioSesion() {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const { signin, isAuthenticated, errors: authErrors, setErrors } = useAuth(); // Incluye `setErrors` para limpiar errores
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signin(data);
      showSuccessAlert('Bienvenido!', 'Estas listo para iniciar tu rutina???');
      setErrors([]); // Limpia errores
      navigate('/inicio');
    } catch (error) {
      if (error.response && error.response.data.message === "Token expirado") {
        showErrorAlert("Sesión expirada", "Por favor, inicia sesión nuevamente.");
        navigate("/login");
      } else {
        showErrorAlert("Error de autenticación", "Credenciales incorrectas o servidor no disponible.");
      }
    }
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio');
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="form">
        {/* Mostrar errores de autenticación */}
        {authErrors && <ErrorAlert errors={authErrors} />}

        <form onSubmit={onSubmit}>
          <label className="form-label">
            Email
            <input
              type="email"
              {...register('email', {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Debe ser un email válido"
                }
              })}
              placeholder="Ingrese el Email"
              className="container2-input"
            />
          </label>
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email.message}</p>
          )}

          <label className="form-label">
            Password
            <input
              type="password"
              {...register('password', {
                required: "El password es obligatorio",
                minLength: {
                  value: 6,
                  message: "El password debe tener al menos 6 caracteres"
                }
              })}
              placeholder="Ingrese el Password"
              className="container3-input"
            />
          </label>
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password.message}</p>
          )}

          <button type="submit" className="container4-button1 mt-4 my-3">Iniciar Sesión</button>
          <p className="flex gap-x-2 justify-between">
            <Link to="/forgot-password" className="text-sky-500 mt-4 my-3">Olvidaste tu contraseña?</Link>
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
      <Inicio />
      <FormularioSesion />
    </section>
  );
};
