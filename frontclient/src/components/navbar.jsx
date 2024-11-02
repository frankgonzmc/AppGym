import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/nav.css';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (dropdownOpen) {
      const timer = setTimeout(() => setDropdownOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [dropdownOpen]);

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Link to="/"><h1>APP GYM</h1></Link>
      </div>
      <div className="nav-links">
        <Nav className="justify-content-center" style={{ width: "100%" }}>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/rutinas">Rutinas</Nav.Link>
          <Nav.Link as={Link} to="/progreso">Progreso</Nav.Link>
          <Nav.Link as={Link} to="/ejercicios">Ejercicios</Nav.Link>
          <Nav.Link as={Link} to="/progreso">Progreso</Nav.Link>
        </Nav>
        {isAuthenticated ? (
          <NavDropdown
            title={`Bienvenido: ${user.username}`}
            id="nav-dropdown"
            show={dropdownOpen}
            onToggle={toggleDropdown}
          >
            <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
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


/*

{ to: "/calendar", img: calendar, title: "Calendario" },
        { to: "/rutinas", img: muscle, title: "Mis Rutinas" },
        { to: "/progreso", img: control, title: "Panel de Progresos" },
        { to: "/add-rutinas", img: tab, title: "Crear Rutina" },
        { to: "/ejercicios", img: body, title: "Ver Ejercicios" }

*/