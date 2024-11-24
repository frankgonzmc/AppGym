import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authcontext'

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <h1>Cargando...</h1>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;