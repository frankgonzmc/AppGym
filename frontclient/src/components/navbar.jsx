import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavDropdown, Badge, Toast } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useAuth } from "../context/authcontext";
import { useNotifications } from "../context/notificacioncontext";
import "../css/nav.css";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { notifications } = useNotifications(); // Obtener notificaciones del contexto
  const [showNotifications, setShowNotifications] = useState(false);

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
            <NavDropdown title="Rutinas" id="nav-dropdown">
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

      {/* Contenedor único de notificaciones */}
      {showNotifications && (
        <Toast
          style={{
            position: "fixed",
            top: "10%",
            right: "10%",
            zIndex: 1050,
            width: "300px",
          }}
          onClose={() => setShowNotifications(false)}
        >
          <Toast.Header>
            <strong className="me-auto">NOTIFICACIONES</strong>
          </Toast.Header>
          <Toast.Body>
            {notifications.length > 0 ? (
              notifications.map((noti, index) => (
                <div key={index} className={`alert alert-${noti.tipo} p-2`}>
                  {noti.mensaje}
                </div>
              ))
            ) : (
              <p>No tienes notificaciones pendientes.</p>
            )}
          </Toast.Body>
        </Toast>
      )}
    </>
  );
}

export default Navbar;
