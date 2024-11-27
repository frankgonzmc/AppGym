import { useEffect, useState } from "react";
import { showWarningAlert } from "./alerts/utils-alerts";
import axios from "../api/axios";

const useRoutineAlerts = (intervalTime) => {
    const [alertsEnabled, setAlertsEnabled] = useState(true);

    useEffect(() => {
        if (alertsEnabled) {
            const interval = setInterval(async () => {
                try {
                    const response = await axios.get("/rutinas/incomplete");                

                    if (!response.ok) {
                        throw new Error(`Error ${response.status}: ${response.statusText}`);
                    }

                    const data = await response.json();

                    if (data.rutinas.length > 0) {
                        showWarningAlert(
                            "¡Atención!",
                            `Tienes ${data.rutinas.length} rutina(s) sin completar.`
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
