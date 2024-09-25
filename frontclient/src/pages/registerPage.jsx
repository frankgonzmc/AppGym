import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import fondo from "../imagenes/magym.jpg";
import '../css/register.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function RegistroUsuario() {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navegar = useNavigate()

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
              RegisterErrors.map((error, i) => (
                <div className="bg-red-500 p-2 text-while" key={i}>
                  {error}
                </div>
              ))
            }
            <form onSubmit={onSubmit} className="form-register">
              <label
                className="form-label"> <input type="text" {...register('username', { required: true })} placeholder="Nombre Completo" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />
              </label>
              {errors.username && (<p className="text-red-500">El Nombre Completo es Necesario!</p>)}
              <label
                className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Email" className="info-childs-input" />
              </label>
              {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}
              <label
                className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="info-childs-input" />
              </label>
              {errors.password && (<p className="text-red-500"> Password es Necesario! </p>)}
              <label
                className="form-label"><input type="edad" {...register('edad', { required: true })} placeholder="Edad" className="info-childs-input" />
              </label>
              {errors.edad && (<p className="text-red-500"> Edad es Necesario! </p>)}

              <label
                className="form-label"><input type="password" {...register('estatura', { required: true })} placeholder="Estatura" className="info-childs-input" />
              </label>
              {errors.estatura && (<p className="text-red-500"> Estatura es Necesario! </p>)}

              <label
                className="form-label"><input type="peso" {...register('peso', { required: true })} placeholder="Peso" className="info-childs-input" />
              </label>
              {errors.peso && (<p className="text-red-500"> Peso es Necesario! </p>)}

              <button type="submit" value="Registrarse" className="registerbtn">Registrarse</button>
            </form>

            <p className="flex gap-x-2 justify-between">
              Ya tienes una cuenta? <Link to="/login" className="text-sky-500">Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistroUsuario;