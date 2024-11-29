import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const generarNotificaciones = async (userId) => {
        if (!userId) return;
        let nuevasNotificaciones = [];
        try {
            const { data } = await axios.get(`/rutinas/${userId}/incomplete`);
            if (data.rutinas && data.rutinas.length > 0) {
                nuevasNotificaciones.push({
                    mensaje: `Tienes ${data.rutinas.length} rutina(s) pendientes.`,
                    tipo: "warning",
                });
            }
        } catch (error) {
            console.error("Error al obtener rutinas:", error);
        }
        setNotifications(nuevasNotificaciones);
    };

    return (
        <NotificationContext.Provider value={{ notifications, generarNotificaciones }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
