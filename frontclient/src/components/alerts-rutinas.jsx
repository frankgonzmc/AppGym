import { useEffect, useState } from "react";
import { showInteractiveAlert } from "./alerts/utils-alerts";
import { useAuth } from "../context/authcontext";
import axios from "../api/axios";

const useRoutineAlerts = (intervalTime) => {
    const { user } = useAuth(); // Obtener información del usuario autenticado
    const [alertsEnabled, setAlertsEnabled] = useState(true);

    useEffect(() => {
        if (alertsEnabled && user) {
            const interval = setInterval(async () => {
                try {
                    // Enviar solicitud al backend con el ID del usuario
                    const { data } = await axios.get(`/rutinas/${user.id}/incomplete`);

                    if (data.rutinas && data.rutinas.length > 0) {
                        const confirmed = await showInteractiveAlert(
                            "¡Atención!",
                            `Tienes ${data.rutinas.length} rutina(s) pendientes. ¿Deseas ir a completarlas?`
                        );

                        if (confirmed) {
                            // Redirige a la página de rutinas
                            window.location.href = "/rutinas";
                        }
                    }
                } catch (error) {
                    console.error("Error al obtener rutinas incompletas:", error.response?.data?.message || error.message);
                }
            }, intervalTime);

            return () => clearInterval(interval); // Limpia el intervalo al desmontar
        }
    }, [alertsEnabled, intervalTime, user]);

    return { setAlertsEnabled };
};

export default useRoutineAlerts;
