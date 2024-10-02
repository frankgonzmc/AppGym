import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { useEffect } from "react";

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
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold text-white">APP GYM</h1>
      </Link>
      <ul className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="relative">
              <button onClick={toggleDropdown} className="text-white">
                Nivel: {user.nivel} | Bienvenido: {user.username} {showDropdown && '▼'}
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/profile">Perfil</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link to="/" onClick={logout}>Cerrar Sesión</Link>
                  </li>
                </ul>
              )}
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="text-white">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

