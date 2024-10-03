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
  }

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
    <nav className="bg-zinc-700 my-3 p-3 rounded-lg d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Link to="/"><h1 className="text-2xl font-bold text-white mt-1 mr-4">APP GYM</h1></Link>
        {isAuthenticated && (
          <NavDropdown
            title={`Nivel: ${user.nivel} | Bienvenido: ${user.username}`}
            id="nav-dropdown"
            show={dropdownOpen}
            onToggle={toggleDropdown}
            className="text-2x1 text-white text-left"
          >
            <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
          </NavDropdown>
        )}
      </div>
      <Nav>
        {!isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/login" className="text-white">Login</Nav.Link>
            <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
          </>
        ) : null}
      </Nav>
    </nav>
  );
}

export default Navbar;

