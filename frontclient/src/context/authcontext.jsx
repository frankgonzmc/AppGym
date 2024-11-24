import { useState, createContext, useContext, useEffect } from "react";
import {
    registerRequest,
    loginRequest,
    verifityTokenRequest,
    updatePasswordRequest,
    updatePerfilRequest,
    checkEmailRequest,
} from "../api/auth";
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

    // Registrar usuario
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log("Usuario registrado:", res.data);

            await signin({ email: user.email, password: user.password });

            setErrors([]);
        } catch (error) {
            console.error("Error en signup:", error);
            if (error.response) {
                setErrors([error.response.data.message || "Error en el registro"]);
            } else {
                setErrors(["Error al conectar con el servidor"]);
            }
        }
    };

    // Iniciar sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log("Usuario autenticado:", res.data);

            Cookies.set("token", res.data.token, {
                expires: 1, // Expira en 1 día
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            });

            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            console.error("Error en signin:", error);
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message || "Error al iniciar sesión"]);
        }
    };

    // Actualizar contraseña
    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const res = await updatePasswordRequest(currentPassword, newPassword);
            console.log("Contraseña actualizada con éxito:", res.data);
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error.response?.data);
            throw new Error("No se pudo actualizar la contraseña.");
        }
    };

    // Actualizar perfil
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

    // Verificar si el email existe
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

    // Cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        Cookies.remove("token");
    };

    // Verificar el token al cargar la aplicación
    const checkLogin = async () => {
        const token = Cookies.get("token");

        if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            setUser(null);
            return;
        }

        try {
            const res = await verifityTokenRequest(token);

            if (res.data) {
                setIsAuthenticated(true);
                setUser(res.data);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Error verificando el token:", error);

            if (error.response && error.response.status === 401) {
                // Si el token ha expirado, elimínalo
                Cookies.remove("token");
            }

            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Verificar el login cuando se monta el componente
    useEffect(() => {
        checkLogin();
    }, []);

    // Manejar errores para eliminarlos después de un tiempo
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
