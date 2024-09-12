import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import fondo from "../imagenes/magym.jpg";
import '../css/register.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegistroUsuario() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
                <div className="bg-red-500 p-2 text-while">
                  {error}
                </div>
              ))
            }
            <form onSubmit={onSubmit} className="form-register">
              <label className="form-label"><input type="text" {...register('username', { required: true })} placeholder="Nombre Completo" className="info-childs-input" /></label>
              {errors.username && (<p className="text-red-500">El Nombre Completo es Necesario!</p>)}
              <label className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Email" className="info-childs-input" /></label>
              {errors.email && (<p className="text-red-500"> Email es Necesario! </p>)}
              <label className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="info-childs-input" /></label>
              {errors.password && (<p className="text-red-500"> Password es Necesario! </p>)}
              <button type="submit" value="Registrarse" className="registerbtn">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistroUsuario;