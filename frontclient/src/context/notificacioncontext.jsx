import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "./authcontext";

const NotificacionContext = createContext();

export const NotificationsProvider = ({ children }) => {
    const { isAuthenticated, user } = useAuth();
    const [notifications, setNotifications] = useState([]);

    const generarNotificaciones = async () => {
        if (!isAuthenticated || !user || !user._id) return;

        let nuevasNotificaciones = [];

        try {
            const { data } = await axios.get(`/rutinas/${user._id}/incomplete`);
            if (data.rutinas && data.rutinas.length > 0) {
                nuevasNotificaciones.push({
                    mensaje: `Tienes ${data.rutinas.length} rutina(s) pendientes. ¡No olvides completarlas!`,
                    tipo: "warning",
                });
            }
        } catch (error) {
            console.error("Error al obtener rutinas pendientes:", error);
        }

        const estadoIMC = calcularEstado();
        nuevasNotificaciones.push({
            mensaje: `Tu IMC indica ${estadoIMC.estado}. ${estadoIMC.tipo === "danger"
                    ? "Se recomienda enfocarte en un cambio significativo en tu dieta y ejercicio."
                    : "Mantén un estilo de vida equilibrado."
                }`,
            tipo: estadoIMC.tipo,
        });

        if (!user.objetivos) {
            nuevasNotificaciones.push({
                mensaje: "Falta completar tus objetivos en el perfil.",
                tipo: "warning",
            });
        }
        if (!user.nivelActividad) {
            nuevasNotificaciones.push({
                mensaje: "Falta completar tu nivel de actividad en el perfil.",
                tipo: "warning",
            });
        }

        setNotifications(nuevasNotificaciones);
    };

    const calcularEstado = () => {
        if (!user || !user.peso || !user.estatura) {
            return { estado: "Datos insuficientes para calcular el IMC.", tipo: "info" };
        }

        const imc = user.peso / (user.estatura * user.estatura);
        if (imc < 16.0) return { estado: "Delgadez severa", tipo: "danger" };
        if (imc < 17.0) return { estado: "Delgadez moderada", tipo: "warning" };
        if (imc < 18.5) return { estado: "Delgadez leve", tipo: "warning" };
        if (imc < 25.0) return { estado: "Normal", tipo: "success" };
        if (imc < 30.0) return { estado: "Sobrepeso", tipo: "warning" };
        if (imc < 35.0) return { estado: "Obesidad grado 1", tipo: "danger" };
        if (imc < 40.0) return { estado: "Obesidad grado 2", tipo: "danger" };
        return { estado: "Obesidad grado 3", tipo: "danger" };
    };

    useEffect(() => {
        generarNotificaciones();
    }, [user, isAuthenticated]); // Actualiza cuando el usuario cambie

    return (
        <NotificacionContext.Provider value={{ notifications }}>
            {children}
        </NotificacionContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificacionContext);
