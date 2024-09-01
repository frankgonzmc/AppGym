import React from "react";
import userlogo from "../imagenes/user.png";



export function Panel(){
    return (
        <div className="panel-user">
            <div className="panel-user-divimg">
                <img src={userlogo} alt="Userimg" className="panel-user-img"/>
            </div>
            <div className="panel-c">
                <h2 className="panelc-h">Nombre:</h2>
                <h4 className="panelc-d">TuNombreyApellido</h4>
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
                <button className="panelc-btn">Cerrar Sesión</button>
            </div>
        </div>
    );
}