import { useForm } from "react-hook-form";

//Importar archivos CSS
import '../css/login.css';
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import logo from "../imagenes/logo.png";

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
  const { signin, errors: signinErrors } = useAuth();
  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="container-u">
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit} className="form-register">
        <label
          className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Email" className="info-childs-input" />
        </label>
        {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}
        <label
          className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="info-childs-input" />
        </label>
        {errors.password && (<p className="text-red-500"> Password es Necesario! </p>)}

        <button type="submit" value="container4-button1" className="registerbtn">Iniciar Sesion</button>
      </form>
      <p className="flex gap-x-2 justify-between">
        No tienes una cuenta? <Link href="/register" className="text-sky-0">Registrarse</Link>
      </p>
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
