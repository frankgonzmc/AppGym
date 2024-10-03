import { useForm } from "react-hook-form";

//Importar archivos CSS
import '../css/login.css';
import { useAuth } from "../../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../imagenes/logo.png";
import { useEffect } from "react";

export function Inicio() {
  return (
    <div className="container1">
      <h1 className="container1-title">APP GYM</h1>
      <img src={logo} alt="Logo" className="img-logo" />
    </div>
  );
}

export function FormularioSesion() {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  })

  useEffect(() => {
    if (isAuthenticated) navigate('/inicio')
  }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit} className="form-register">
          <label
            className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Ingrese el Email" className="info-childs-input" />
          </label>
          {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}
          <label
            className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Ingrese el Password" className="info-childs-input" />
          </label>
          {errors.password && (<p className="text-red-500"> Password es Necesario! </p>)}

          <button type="submit" className="btn btn-primary mt-4 my-4">Iniciar Sesion</button>
          <br />
          <p className="flex gap-x-2 justify-between">
            <Link to="/forgot-password">olvidaste tu contraseña?</Link>
          </p>
        </form>
        <hr className="text-white"/>
        <br />
        <p className="flex gap-x-2 justify-between text-white">
          No tienes una cuenta? <Link to="/register" className="text-sky-500">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}


export const LoginPage = () => {
  return (
    <div>
      <Inicio />
      <FormularioSesion />
    </div>
  );
};
