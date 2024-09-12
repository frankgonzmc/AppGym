import { Panel } from "../components/panelUsuario.jsx";
import { PanelElements } from "../components/panelElements.jsx";
import '../css/inicio.css';

export function Inicio() {

    const { user } = useAuth()
    console.log(user)


    return (
        <div className="inicio-container">
            <Panel />
            <PanelElements />
        </div>
    );
}


