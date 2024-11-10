import { Card } from "../ui";
import { useNavigate } from 'react-router-dom';
import { useProgreso } from "../../context/progresocontext";

export function RutinaExistenteCard({ rutinaExistente }) {
    const navigate = useNavigate();
    const { progreso } = useProgreso();


    return (
        <Card>
            <header className="flex justify-between">
                <h1 className="text-2xl text-slate-300 font-bold text-center">{rutinaExistente.nombre}</h1>
            </header>
            <hr className="text-slate-300" />
            <p className="text-slate-300">Descripción: {rutinaExistente.descripcion}</p>

            <footer>
                <div className="flex gap-x-3 items-center">
                    {/*<button className="btn btn-primary" onClick={() => navigate(`/rutinas/${rutina._id}`)}>Seleccionar</button>*/}
                    {/*<button className="btn btn-primary" onClick={() => navigate(`/detalles-rutinas/${rutina._id}`)}>Ver Ejercicios</button>*/}
                </div>
            </footer>
        </Card>
    );
}
