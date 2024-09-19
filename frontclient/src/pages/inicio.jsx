import { PanelElements } from "../components/panelElements.jsx";
import { useAuth } from "../context/authcontext"
import '../css/inicio.css';

export function Inicio() {

    const { user } = useAuth()
    console.log(user)


    return (
        <div className="inicio-container">
            <PanelElements />
        </div>
    );
}


