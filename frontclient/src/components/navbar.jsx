import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/nav.css';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, dropdownOpenRutina, setDropdownOpen, setDropdownOpenRutina] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdownRutina = () => setDropdownOpenRutina(!dropdownOpenRutina);

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
          <NavDropdown title="Rutinas" id="nav-dropdown" show={dropdownOpenRutina} onToggle={toggleDropdownRutina}>
            <NavDropdown.Item as={Link} to="/rutinas">Mis Rutinas</NavDropdown.Item>
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
