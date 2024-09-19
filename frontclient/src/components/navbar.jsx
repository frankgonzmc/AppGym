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
              <Link to="/register">Register</Link>
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