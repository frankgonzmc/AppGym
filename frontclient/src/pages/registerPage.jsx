import { useForm } from "react-hook-form";
import fondo from "../imagenes/magym.jpg";
import '../css/register.css';


function RegisterPage() {

  const { register, handleSubmit } = useForm();

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
            <form onSubmit={handleSubmit(values => { console.log(values); })} className="form-register">
              <label className="form-label"><input type="text" {...register('username', { required: true })} placeholder="Full Name" className="info-childs-input" /></label>
              <label className="form-label"><input type="email" {...register('email', { required: true })} placeholder="Username" className="info-childs-input" /></label>
              <label className="form-label"><input type="password" {...register('password', { required: true })} placeholder="Password" className="info-childs-input" /></label>
              <button type="submit" value="Registrarse" className="registerbtn">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;