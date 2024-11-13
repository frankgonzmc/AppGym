import { createContext, useContext, useState } from "react";
import {
    getProgresoRequest,
    createProgresoRequest,
    deleteProgresoRequest,
    updateProgresoRequest,
} from "../api/progreso";

const ProgresoContext = createContext();

export const useProgreso = () => {
    const context = useContext(ProgresoContext);
    if (!context) throw new Error("useProgreso debe estar dentro de un ProgresoProvider");
    return context;
};

export function ProgresoProvider({ children }) {
    const [progreso, setProgreso] = useState({});

    const getProgreso = async (id) => {
        try {
            const response = await getProgresoRequest(id);
            const progresoData = response.data || {}; // Asegúrate de que hay datos en la respuesta
            const ejerciciosCompletados = progresoData.ejerciciosCompletados || 0;

            // Log para verificar que se está recibiendo la respuesta correcta
            console.log("Datos de progreso recibidos para la rutina:", id, progresoData);

            // Actualiza el estado global `progreso` con el progreso de la rutina especificada
            setProgreso((prev) => ({
                ...prev,
                [id]: { ...progresoData, ejerciciosCompletados },
            }));

            return { progreso: progresoData, ejerciciosCompletados };
        } catch (error) {
            console.error("Error al obtener progreso de la rutina:", error);
            return { progreso: null, ejercicios: [] };
        }
    };

    const createProgreso = async (progresoData) => {
        try {
            const res = await createProgresoRequest(progresoData);
            console.log(res.data);
            return res.data; // Devolver el progreso creado
        } catch (error) {
            console.error("Error al crear progreso:", error);
        }
    };

    const deleteProgreso = async (id) => {
        try {
            const res = await deleteProgresoRequest(id);
            if (res.status === 204) {
                setProgreso((prevProgreso) => {
                    const updatedProgreso = { ...prevProgreso };
                    delete updatedProgreso[id]; // Elimina el progreso específico
                    return updatedProgreso;
                });
            }
        } catch (error) {
            console.log("Error al eliminar progreso:", error);
        }
    };

    const updateProgreso = async (id, progresoData) => {
        try {
            const res = await updateProgresoRequest(id, progresoData);
            const updatedProgreso = res.data;
            setProgreso((prevProgreso) => ({
                ...prevProgreso,
                [id]: updatedProgreso,
            }));
        } catch (error) {
            console.error("Error al actualizar progreso:", error);
        }
    };

    const updateProgresoEjercicio = (rutinaId, ejerciciosCompletados) => {
        setProgreso((prevProgreso) => ({
            ...prevProgreso,
            [rutinaId]: {
                ...prevProgreso[rutinaId],
                ejerciciosCompletados,
            },
        }));
    };

    return (
        <ProgresoContext.Provider
            value={{
                progreso,
                setProgreso,
                getProgreso,
                createProgreso,
                deleteProgreso,
                updateProgreso,
                updateProgresoEjercicio,
            }}
        >
            {children}
        </ProgresoContext.Provider>
    );
}
