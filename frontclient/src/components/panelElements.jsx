import calendar from "../imagenes/calendar.png";
import muscle from "../imagenes/muscle.png";
import control from "../imagenes/control.png";
import tab from "../imagenes/tab.png";
import body from "../imagenes/body.png";
import { Link } from "react-router-dom";
import '../css/panelElements.css';

export function PanelElements() {

    return (
        <div className="panel-container">
            <div className="panel-elements">
                <Link to="/calendar">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={calendar} alt="calendar" className="paneles-img" />
                        </button>
                        <h2>Calendario</h2>
                    </div>
                </Link>
                <Link to="/rutinas">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={muscle} alt="Rutinas" className="paneles-img" />
                        </button>
                        <h2>Mis Rutinas</h2>
                    </div>
                </Link>
                <Link to="/progreso">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={control} alt="Panel" className="paneles-img" />
                        </button>
                        <h2>Panel de Progresos</h2>
                    </div>
                </Link>
                <Link to="/add-rutinas">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={tab} alt="Añadir Rutina" className="paneles-img" />
                        </button>
                        <h2>Crear Rutina</h2>
                    </div>
                </Link>
                <Link to="/ejercicios">
                    <div className="paneles-item">
                        <button className="paneles-btn">
                            <img src={body} alt="Ejercicios" className="paneles-img" />
                        </button>
                        <h2>Ver Ejercicios</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
}
