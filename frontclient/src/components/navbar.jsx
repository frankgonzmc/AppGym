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

  // Función para calcular el estado basado en IMC
  const calcularEstado = () => {
    if (!user || !user.peso || !user.estatura) {
      return { estado: "Datos insuficientes para calcular el IMC.", tipo: "warning" };
    }

    const imc = user.peso / (user.estatura * user.estatura);
    if (imc < 16.0) return { estado: "Delgadez severa", tipo: "danger" };
    if (imc < 17.0) return { estado: "Delgadez moderada", tipo: "warning" };
    if (imc < 18.5) return { estado: "Delgadez leve", tipo: "warning" };
    if (imc < 25.0) return { estado: "Normal", tipo: "success" };
    if (imc < 30.0) return { estado: "Sobrepeso", tipo: "warning" };
    if (imc < 35.0) return { estado: "Obesidad grado 1", tipo: "danger" };
    if (imc < 40.0) return { estado: "Obesidad grado 2", tipo: "danger" };
    return { estado: "Obesidad grado 3", tipo: "danger" };
  };

  // Función para generar notificaciones
  const generarNotificaciones = async () => {
    if (!isAuthenticated || !user || !user._id) return;

    let nuevasNotificaciones = [];

    // Agregar notificación de rutinas pendientes
    try {
      const { data } = await axios.get(`/rutinas/${user._id}/incomplete`);
      if (data.rutinas && data.rutinas.length > 0) {
        nuevasNotificaciones.push({
          mensaje: `Tienes ${data.rutinas.length} rutina(s) pendientes. ¡No olvides completarlas!`,
          tipo: "warning",
        });
      }
    } catch (error) {
      console.error(
        "Error al obtener rutinas pendientes:",
        error.response?.data?.message || error.message
      );
    }

    // Agregar notificación basada en el IMC
    const estadoIMC = calcularEstado();
    nuevasNotificaciones.push({
      mensaje: `Tu IMC indica ${estadoIMC.estado}. ${estadoIMC.tipo === "danger"
          ? "Se recomienda enfocarte en cambios significativos en tu dieta y ejercicio."
          : "Mantén un estilo de vida equilibrado."
        }`,
      tipo: estadoIMC.tipo,
    });

    // Agregar notificación si faltan datos en el perfil
    if (!user.objetivos) {
      nuevasNotificaciones.push({
        mensaje: "Falta completar tus objetivos en el perfil.",
        tipo: "warning",
      });
    }
    if (!user.nivelActividad) {
      nuevasNotificaciones.push({
        mensaje: "Falta completar tu nivel de actividad en el perfil.",
        tipo: "warning",
      });
    }

    setNotifications(nuevasNotificaciones);
  };

  useEffect(() => {
    generarNotificaciones();
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
                <FaBell className="text-warning" size={24} style={{ cursor: "pointer" }} />
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
        {notifications.map((noti, index) => (
          <Toast
            key={index}
            bg={noti.tipo}
            onClose={() =>
              setNotifications((prev) => prev.filter((_, i) => i !== index))
            }
            autohide
            delay={5000}
          >
            <Toast.Header>
              <strong className="me-auto">Notificaciones</strong>
            </Toast.Header>
            <Toast.Body>{noti.mensaje}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
}

export default Navbar;
