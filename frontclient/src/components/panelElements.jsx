import React from "react";
import { Link } from "react-router-dom"; // Importa Link para navegación
import calendar from "../imagenes/calendar.png";
import muscle from "../imagenes/muscle.png";
import control from "../imagenes/control.png";
import ai from "../imagenes/ai.png";
import tab from "../imagenes/tab.png";
import body from "../imagenes/body.png";

export function PanelElements() {
    return (
        <div className="panel-elements">
            <div className="paneles-item">
                <Link to="/calendario" className="paneles-btn">
                    <img src={calendar} alt="Calendario" className="paneles-img" />
                </Link>
                <h2>Calendario</h2>
            </div>
            <div className="paneles-item">
                <Link to="/rutinas" className="paneles-btn">
                    <img src={muscle} alt="Mis Rutinas" className="paneles-img" />
                </Link>
                <h2>Mis Rutinas</h2>
            </div>
            <div className="paneles-item">
                <Link to="/progreso/{id}" className="paneles-btn">
                    <img src={control} alt="Panel de Seguimiento" className="paneles-img" />
                </Link>
                <h2>Panel de Seguimiento</h2>
            </div>
            <div className="paneles-item">
                <Link to="/rutinas/{id}" className="paneles-btn">
                    <img src={tab} alt="Crear Rutina" className="paneles-img" />
                </Link>
                <h2>Crear Rutina</h2>
            </div>
            <div className="paneles-item">
                <Link to="/ejercicios" className="paneles-btn">
                    <img src={body} alt="Ver Ejercicios" className="paneles-img" />
                </Link>
                <h2>Ver Ejercicios</h2>
            </div>
            <div className="paneles-item">
                <Link to="/historial/{id}" className="paneles-btn">
                    <img src={calendar} alt="Historial" className="paneles-img" />
                </Link>
                <h2>Historial</h2>
            </div>
        </div>
    );
}
