
/*
import React from "react";
import userlogo from "../imagenes/user.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";



export function Panel() {

    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return <div>No estás autenticado</div>; // Manejo si no estás autenticado
    }

    return (
        <div className="panel-user">
            <Link to="/">
                <div className="panel-user-divimg">
                    <img src={userlogo} alt="Userimg" className="panel-user-img" />
                </div>
            </Link>
            <div className="panel-c">
                <h2 className="panelc-h">Nombre:</h2>
                <h4 className="panelc-d">{user.username}</h4>
            </div>
            <div className="panel-c">
                <h2 className="panelc-h">Nivel:</h2>
                <h4 className="panelc-d">Principiante</h4>
            </div>
            <div className="panel-c">
                <h2 className="panelc-h">Meta:</h2>
                <h4 className="panelc-d">Aumentar masa muscular.</h4>
            </div>
            <div className="panel-c">
                <Link to="/" onClick={() => { logout() }} className="panelc-btn">Cerrar Sesión</Link>
            </div>
        </div>
    );
}
    */