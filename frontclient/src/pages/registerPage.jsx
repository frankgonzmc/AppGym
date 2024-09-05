import {useForm} from "react-hook-form";
import fondo from "../imagenes/magym.jpg";
import '../css/register.css';


export function Registro(){
  
  const {register} = UseForm();

  return (
    <section className="section-register">
      <div className="container-form">
        <div className="information">
          <div className="info-childs">
            <img src={fondo} alt="Fondo"/>    
              <h2 className="info-childs-h2">Bienvenido</h2>
              <p className="info-childs-p">Para unirte a nuestra comunidad por favor Registrate.</p>
          </div>
        </div>
        <div className="form-information">
          <div className="form-information-childs">
            <h2 className="form-information-childs-h2">Crear una Cuenta</h2>
            <form className="form-register">
              <label className="form-label"><input type="text" placeholder="Full Name" {...register('username', {required: true})} className="info-childs-input"/></label>
              <label className="form-label"><input type="email" placeholder="Username" className="info-childs-input"/></label>
              <label className="form-label"><input type="password" placeholder="Password" className="info-childs-input"/></label>
              <input type="submit" value="Registrarse" className="registerbtn"/>
            </form>
          </div>
        </div>
      </div>  
    </section>
  );
}