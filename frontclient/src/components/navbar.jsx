import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { Nav, NavDropdown, Badge, Toast, ToastContainer } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import axios from "../api/axios";
import "../css/nav.css";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenRutina, setDropdownOpenRutina] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdownRutina = () => setDropdownOpenRutina(!dropdownOpenRutina);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => setDropdownOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpenRutina) {
      const timer = setTimeout(() => setDropdownOpenRutina(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpenRutina]);

  const calcularEstado = () => {
    const { peso = 0, estatura = 0 } = user;

    if (peso === 0 || estatura === 0) {
      return "Datos insuficientes para calcular el IMC.";
    }

    const imc = peso / (estatura * estatura);
    if (imc < 16.0) return "Delgadez severa";
    if (imc < 17.0) return "Delgadez moderada";
    if (imc < 18.5) return "Delgadez leve";
    if (imc < 25.0) return "Normal";
    if (imc < 30.0) return "Sobrepeso";
    if (imc < 35.0) return "Obesidad grado 1";
    if (imc < 40.0) return "Obesidad grado 2";
    return "Obesidad grado 3";
  };

  // Generar notificaciones
  useEffect(() => {
    const generarNotificaciones = async () => {
      let nuevasNotificaciones = [];

      // Rutinas pendientes
      try {
        const { data } = await axios.get(`/rutinas/${user._id}/incomplete`);
        if (data.rutinas && data.rutinas.length > 0) {
          nuevasNotificaciones.push(
            `Tienes ${data.rutinas.length} rutina(s) pendientes. ¡No olvides completarlas!`
          );
        }
      } catch (error) {
        console.error("Error al obtener rutinas pendientes:", error.response?.data?.message || error.message);
      }

      // Estado del usuario basado en IMC
      const estadoIMC = calcularEstado();
      if (estadoIMC.includes("Obesidad")) {
        nuevasNotificaciones.push(
          "Tu IMC indica obesidad. Se recomienda enfocarte en perder peso mediante una dieta adecuada y ejercicio."
        );
      } else if (estadoIMC.includes("Delgadez")) {
        nuevasNotificaciones.push(
          "Tu IMC indica delgadez. Se recomienda enfocarte en ganar masa muscular con un plan de entrenamiento y dieta balanceada."
        );
      }

      // Faltan datos en el perfil
      if (!user.objetivos) {
        nuevasNotificaciones.push("Falta completar tus objetivos en el perfil.");
      }
      if (!user.nivelActividad) {
        nuevasNotificaciones.push("Falta completar tu nivel de actividad en el perfil.");
      }

      setNotifications(nuevasNotificaciones);
    };

    if (isAuthenticated && user) {
      generarNotificaciones();
    }
  }, [user, isAuthenticated]);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <h1>APP GYM</h1>
          </Link>
        </div>
        <div className="nav-links">
          <Nav className="justify-content-center" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <NavDropdown
              title="Rutinas"
              id="nav-dropdown"
              show={dropdownOpenRutina}
              onToggle={toggleDropdownRutina}
            >
              <NavDropdown.Item as={Link} to="/rutinas">Mis Rutinas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rutinas-predeterminadas">Rutinas Existentes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-rutinas">Crear Rutina</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calendar">Calendario</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/progreso">Panel de Progresos</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/ejercicios">Ejercicios</Nav.Link>
            <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              <div className="text-white notifications" onClick={handleBellClick}>
                <FaBell className="text-white text-warning" size={24} style={{ cursor: "pointer" }} />
                {notifications.length > 0 && (
                  <Badge bg="danger" pill className="position-relative">
                    {notifications.length}
                  </Badge>
                )}
              </div>
              <NavDropdown
                title={`Bienvenido: ${user.username}`}
                id="nav-dropdown-user"
                show={dropdownOpen}
                onToggle={toggleDropdown}
              >
                <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq-supporting">FAQ/Soporte</NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <div className="auth-links">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </div>
          )}
        </div>
      </nav>

      {/* Notificaciones */}
      <ToastContainer className="p-3" position="top-end">
        <Toast
          show={showNotifications}
          onClose={() => setShowNotifications(false)}
          bg="info"
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notificaciones</strong>
          </Toast.Header>
          <Toast.Body>
            {notifications.length > 0 ? (
              notifications.map((noti, index) => (
                <div key={index}>
                  <p>{noti}</p>
                  {index < notifications.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <p>No tienes notificaciones pendientes.</p>
            )}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default Navbar;
