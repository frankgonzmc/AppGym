import { useState, createContext, useContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    verifityTokenRequest,
    updatePasswordRequest,
    updateTokenPerfilRequest,
    updateDatosPerfilRequest,
    updatePerfilRequest,
    checkEmailRequest,
} from "../api/auth";
import axios from "../api/axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("El usuario debería estar dentro de un provider.");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const logoutRequest = () => axios.post('/logout'); // Asegúrate de que `axios` incluye `withCredentials`

    const signup = async (user) => {
        try {
            // Registro del usuario
            const res = await registerRequest(user);
            console.log("Usuario registrado:", res.data);

            // Inicia sesión automáticamente con los mismos datos
            await signin({ email: user.email, password: user.password });

            setErrors([]);
            return res.data;
        } catch (error) {
            if (error.response?.data?.message) {
                setErrors(error.response.data.message); // Muestra los errores del backend
            } else {
                setErrors(["Error al conectar con el servidor"]);
            }
            return null;
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log("Usuario autenticado:", res.data);
            // Guarda el estado de autenticación
            setIsAuthenticated(true);
            setUser(res.data);
            setErrors([]); // Limpia errores en caso de éxito (no se requiere)
            return res.data; // Devuelve los datos del usuario autenticado
        } catch (error) {
            //console.error("Error en signin:", error);
            if (error.response?.data?.message) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(["Error al conectar con el servidor"]);
            }
            return null;
        }
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const res = await updatePasswordRequest(currentPassword, newPassword);
            console.log("Contraseña actualizada con éxito:", res.data);
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error.response?.data);
            throw new Error("No se pudo actualizar la contraseña.");
        }
    };

    const updatePerfil = async (datos) => {
        try {
            const res = await updatePerfilRequest(datos);
            if (res.data) {
                setUser(res.data);
                console.log("Perfil actualizado:", res.data);
                return res.data;
            } else {
                throw new Error("No se recibió una respuesta válida.");
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            throw new Error("No se pudo actualizar el perfil.");
        }
    };

    const updateDatosPerfil = async (datos) => {
        try {
            const res = await updateDatosPerfilRequest(datos);
            if (res.data) {
                console.log("Perfil actualizado:", res.data);  // Asegúrate de que los datos contengan el campo 'estado'
                setUser(res.data);
                return res.data;
            } else {
                throw new Error("No se recibió una respuesta válida.");
            }
        } catch (error) {
            console.error("Error al actualizar los datos del perfil:", error);
            throw new Error("No se pudieron actualizar los datos del perfil.");
        }
    };

    const updateTokenPerfil = async (tokens) => {
        try {
            const res = await updateTokenPerfilRequest(tokens);
            if (res.data) {
                setUser(res.data);
                console.log("Perfil actualizado:", res.data);
                return res.data;
            } else {
                throw new Error("No se recibió una respuesta válida.");
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            throw new Error("No se pudo actualizar el perfil.");
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

    const logout = async () => {
        try {
            await logoutRequest(); // Llama al backend para eliminar la cookie
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove("token"); // Solo como precaución si el backend no elimina correctamente
            console.log("Sesión cerrada correctamente");
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    const checkLogin = async () => {
        const cookies = Cookies.get();

        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
        }

        try {
            const res = await verifityTokenRequest(cookies.token); // Asegúrate de que 'axios' ya incluye cookies
            if (!res.data) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
           // console.error("Error verificando el token:", error);
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                updatePassword,
                updatePerfil,
                updateTokenPerfil,
                updateDatosPerfil,
                setErrors,
                checkEmailExists,
                loading,
                user,
                isAuthenticated,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
