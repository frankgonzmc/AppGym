import logo from "../imagenes/logo.png";

//Importar archivos CSS
import '../css/login.css';


export function Inicio() {
  return (
    <div className="container1">
      <h1 className="container1-title">APP GYM</h1>
      <img src={logo} alt="Logo" className="img-logo" />
    </div>
  );
}

export function FormularioSesion() {
  return (
    <div className="container-u">
      <form className="form">
        <p id="heading">Login</p>
        <div className="container2">
          <input autoComplete="off" placeholder="Username" className="container2-input" type="text" />
        </div>
        <div className="container3">
          <input placeholder="Password" className="container3-input" type="password" />
        </div>
        <div className="container4">
          <button className="container4-button1">Iniciar Sesion</button>
          <button className="container4-button2">Registrarse</button>
        </div>
        <button className="button3">Olvide la Contraseña</button>
      </form>
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
