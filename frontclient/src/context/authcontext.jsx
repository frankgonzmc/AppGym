import { useState, createContext, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifityTokenRequest, updatePasswordRequest, updatePerfilRequest, checkEmailRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new error("el usuario deberia estar dentro de un provider, por lo tanto...");
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log("Usuario registrado:", res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            setErrors([]);

            // Verifica el token después de registrar al usuario
            await checkLogin(); // Esta función valida el token y carga el usuario
        } catch (error) {
            console.error("Error en signup:", error);
            if (error.response) {
                setErrors([error.response.data.message || "Error en el registro"]);
            } else {
                setErrors(["Error al conectar con el servidor"]);
            }
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const res = await updatePasswordRequest(currentPassword, newPassword);
            console.log('Contraseña actualizada con éxito', res.data);
        } catch (error) {
            console.log('Error al actualizar la contraseña', error.response.data);
            throw new Error('No se pudo actualizar la contraseña.');
        }
    };

    const updatePerfil = async (datos) => {
        try {
            const res = await updatePerfilRequest(datos);
            if (res.data) {
                setUser(res.data); // Actualiza el usuario en el contexto
                console.log(res.data);
                return res.data;
            } else {
                throw new Error('No se recibió una respuesta válida.');
            }
        } catch (error) {
            console.error('Error al actualizar el perfil', error);
            throw new Error('No se pudo actualizar el perfil');
        }
    };



    const checkEmailExists = async (email) => {
        try {
            await checkEmailRequest(email);
            return false; // El email está disponible
        } catch (error) {
            if (error.response && error.response.status === 409) {
                return true; // El email ya está en uso
            }
            throw error; // Manejar otros errores
        }
    };

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
        Cookies.remove('token')
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        // Función para verificar el login (reutilizable en registro)
        const checkLogin = async () => {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifityTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        };

        checkLogin();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                updatePassword,
                updatePerfil,
                checkEmailExists,
                loading,
                user,
                isAuthenticated,
                errors,
            }}>{children}
        </AuthContext.Provider>
    )
}