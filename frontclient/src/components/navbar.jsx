import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth(); // Asegúrate de que user esté disponible en tu contexto
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">APP GYM</h1>
      </Link>
      <ul className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="relative">
              <button onClick={toggleDropdown} className="text-white">
                Bienvenido: {user.username} ▼
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


/*
import { useAuth } from "../context/authcontext"

function navbar() {

  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2x1 font-bold">HOME PAGE</h1>
      </Link>
      <ul className=" flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome USUARIO
            </li>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li>
              <Link to="/" onClick={() => { logout() }}>Cerrar Sesión</Link>
            </li>
          </>

        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )
        }
      </ul >
    </nav >
  )
}

export default navbar

*/