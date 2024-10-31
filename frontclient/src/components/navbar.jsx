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
      <div>
        <Link to="/"><h1>APP GYM</h1></Link>
      </div>
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <NavDropdown
              title={`Bienvenido: ${user.username}`}
              id="nav-dropdown"
              show={dropdownOpen}
              onToggle={toggleDropdown}
            >
              <NavDropdown.Item as={Link} to="/profile">Perfil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/" onClick={logout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
