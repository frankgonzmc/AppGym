import { PanelElements } from "../components/panelElements.jsx";
import { PanelEjercicios } from "../components/panelEjercicios.jsx";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import '../css/inicio.css';

export function Inicio() {
    const { user } = useAuth();
    //console.log(user);

    return (
        <section className="body">
            <section className="seccion">
                <section>
                    <h1>Bienvenido a App Gym</h1>
                    <div className="card">
                        <p>Conoce las recomendaciones de ejercicios para mejorar tus habilidades</p>
                        <p>Aprende a mejorar tus habilidades y mejorar tu vida diaria</p>
                        <p>¡Empieza a explorar las recomendaciones de ejercicios!</p>
                        <p>¡Disfruta de la experiencia de App Gym!</p>
                        <p>¡No te pierdas la oportunidad de mejorar tus habilidades!</p>
                        <p>¡Aprende a mejorar tus habilidades y mejorar tu vida diaria!</p>
                    </div>
                    <div className="card">
                        <p>Nivel: ${user.nivel} </p>
                    </div>
                </section>
                <section>
                    <div className="card">
                        <div className="panel-elements">
                            <PanelElements />
                        </div>
                        <footer>
                            <div>
                                <Link to="/machine-learning" >Conoce mas sobre tus recomendaciones</Link>
                            </div>
                        </footer>
                    </div>
                </section>
                <section>
                    <div className="card">
                        <div className="panel-ejercicios">
                            <PanelEjercicios />
                        </div>
                    </div>
                </section>
            </section>
            <section>

            </section>
        </section>
    );
}
