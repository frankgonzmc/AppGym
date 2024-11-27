import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { Nav, NavDropdown, Badge, Toast, ToastContainer } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
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

  // Simular notificaciones
  useEffect(() => {
    const pendientes = [
      "Completa tu rutina del martes",
      "Actualiza tu perfil de peso",
      "Revisa las recomendaciones de nutrición",
    ];
    setNotifications(pendientes);
  }, []);

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
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <NavDropdown
              title="Rutinas"
              id="nav-dropdown"
              show={dropdownOpenRutina}
              onToggle={toggleDropdownRutina}
            >
              <NavDropdown.Item as={Link} to="/rutinas">
                Mis Rutinas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rutinas-predeterminadas">
                Rutinas Existentes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/add-rutinas">
                Crear Rutina
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/calendar">
                Calendario
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/progreso">
                Panel de Progresos
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/ejercicios">
              Ejercicios
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Nosotros
            </Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <div className="d-flex align-items-center gap-3">
              <div className="notifications" onClick={handleBellClick}>
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
                <NavDropdown.Item as={Link} to="/profile">
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={logout}>
                  Cerrar Sesión
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faq-supporting">
                  FAQ/Supporting
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <div className="auth-links">
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
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


/*import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/nav.css';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenRutina, setDropdownOpenRutina] = useState(false);

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

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/"><h1>APP GYM</h1></Link>
      </div>
      <div className="nav-links">
        <Nav className="justify-content-center" style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <NavDropdown title="Rutinas" id="nav-dropdown" show={dropdownOpenRutina} onToggle={toggleDropdownRutina}>
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
          <NavDropdown
            title={`Bienvenido: ${user.username}`}
            id="nav-dropdown-user"
            show={dropdownOpen}
            onToggle={toggleDropdown}
          >
            <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/faq-supporting">FAQ/Supporting</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <div className="auth-links">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
*/