import { useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";
import fondo from "../imagenes/magym.jpg";
import '../css/register.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegistroUsuario() {

  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
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
            <form onSubmit={onSubmit} className="form-register">
              <label className="form-label"><input type="text" {...register('username', { required: true })} placeholder="Nombre Completo" className="info-childs-input" /></label>
              <label className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Email" className="info-childs-input" /></label>
              <label className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="info-childs-input" /></label>
              <button type="submit" value="Registrarse" className="registerbtn">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistroUsuario;