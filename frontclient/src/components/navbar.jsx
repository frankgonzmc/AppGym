import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(true);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setShowDropdown(true);
  };

  useEffect(() => {
    let timer;
    if (dropdownOpen) {
      timer = setTimeout(() => {
        setShowDropdown(false); // Oculta la flecha después de 5 segundos
      }, 5000);
    }
    return () => clearTimeout(timer); // Limpiar el timer en caso de que el componente se desmonte
  }, [dropdownOpen]);

  return (
    <nav className="bg-zinc-700 my-3 p-3 rounded-lg">
      <Link to="/" className="text-white text-2xl font-bold">APP GYM</Link>
      <Nav className="ml-auto">
        {isAuthenticated ? (
          <NavDropdown
            title={`Nivel: ${user.nivel} | Bienvenido: ${user.username} ${showDropdown && '▼'}`}
            id="nav-dropdown"
            show={dropdownOpen}
            onToggle={toggleDropdown}
            className="text-white"
          >
            <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
          </>
        )}
      </Nav>
    </nav>
  );
}

export default Navbar;
