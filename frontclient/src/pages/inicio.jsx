import {Panel} from "../components/panelUsuario.jsx";
import {PanelElements} from "../components/panelElements.jsx";
import '../css/inicio.css';

export function Inicio(){
    return(
        <div className="inicio-container">
            <Panel/>
            <PanelElements/>
        </div>
    );
}

