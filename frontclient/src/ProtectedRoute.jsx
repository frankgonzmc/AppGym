import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authcontext'

function ProtectedRoute() {
    const { loading, user, isAuthenticated } = useAuth()
    //console.log(user, isAuthenticated)

    if (loading) return <h1> Loading....</h1>
    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />

    return <Outlet />
}

export default ProtectedRoute