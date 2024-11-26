import { useEffect, useState } from "react";
import { showWarningAlert } from "./alerts/utils-alerts";

const useRoutineAlerts = (intervalTime) => {
    const [alertsEnabled, setAlertsEnabled] = useState(true);

    useEffect(() => {
        if (alertsEnabled) {
            const interval = setInterval(async () => {
                try {
                    const response = await fetch("http://localhost:5000/rutinas/incomplete", {
                        credentials: "include",
                    });
                
                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }
                
                    const data = await response.json();
                
                    if (data.routines.length > 0) {
                        showWarningAlert(
                            "¡Atención!",
                            `Tienes ${data.routines.length} rutina(s) sin completar.`
                        );
                    }
                } catch (error) {
                    console.error("Error al obtener rutinas incompletas:", error.message);
                }
                
            }, intervalTime);

            return () => clearInterval(interval); // Limpia el intervalo al desmontar
        }
    }, [alertsEnabled, intervalTime]);

    return { setAlertsEnabled };
};

export default useRoutineAlerts;
