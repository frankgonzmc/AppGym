import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
    updateDetalleRutinaRequest,
} from "../api/detallerutina";

const DetalleRutinaContext = createContext();

export const useDetallesRutina = () => {
    const context = useContext(DetalleRutinaContext);
    if (!context) {
        throw new Error("useDetallesRutina debe estar dentro de un DetalleRutinaProvider");
    }
    return context;
};

export function DetalleRutinaProvider({ children }) {
    const [detalles, setDetalles] = useState([]);

    // Obtener un detalle específico de la rutina
    const getDetalleRutina = async (id) => {
        try {
            const res = await getDetalleRutinaRequest(id);
            return res;
        } catch (error) {
            console.error("Error al obtener detalle de rutina:", error);
            throw error;
        }
    };

    // Obtener todos los detalles de una rutina
    const fetchDetallesRutina = async (id) => {
        try {
            const response = await getDetalleRutinaRequest(id);
            setDetalles(response);
        } catch (error) {
            console.error("Error al obtener detalles de rutina:", error);
        }
    };

    // Crear un nuevo detalle de rutina
    const createDetalleRutina = async (detalle) => {
        try {
            const res = await createDetalleRutinaRequest(detalle);
            setDetalles((prevDetalles) => [...prevDetalles, res]);
            return res;
        } catch (error) {
            console.error("Error al crear detalle de rutina:", error);
            throw error;
        }
    };

    // Eliminar un detalle de rutina
    const deleteDetalleRutina = async (id) => {
        try {
            await deleteDetalleRutinaRequest(id);
            setDetalles((prev) => prev.filter((detalle) => detalle._id !== id));
        } catch (error) {
            console.error("Error al eliminar detalle de rutina:", error);
        }
    };

    // Actualizar un detalle de rutina
    const updateDetalleRutina = async (id, data) => {
        try {
            const response = await updateDetalleRutinaRequest(id, data);
            setDetalles((prev) =>
                prev.map((detalle) => (detalle._id === id ? response : detalle))
            );
            return response;
        } catch (error) {
            console.error("Error al actualizar detalle:", error);
            throw error;
        }
    };

    // Actualizar progreso de un ejercicio
    const updateProgresoEjercicio = async (detalleId, datos) => {
        try {
            const updatedData = {
                seriesProgreso: datos.seriesCompletadas || 0,
                estado: datos.seriesCompletadas >= datos.ejercicio.series ? "Completado" : "En Progreso",
            };

            console.log("Datos a enviar:", updatedData);

            const detalleActualizado = await updateDetalleRutinaRequest(detalleId, updatedData);
            return detalleActualizado;
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error);
            throw error;
        }
    };

    // Actualizar el progreso general de la rutina
    const updateRutinaProgress = async (rutinaId) => {
        try {
            const detallesResponse = await getDetalleRutinaRequest(rutinaId);
            const ejerciciosCompletos = detallesResponse.filter(
                (detalle) => detalle.estado === "Completado"
            ).length;

            const estadoRutina = ejerciciosCompletos === detallesResponse.length ? "Completado" : "En Progreso";

            console.log(`Rutina ${rutinaId}: ${ejerciciosCompletos}/${detallesResponse.length}`);

            return { ejerciciosCompletos, estadoRutina };
        } catch (error) {
            console.error("Error al actualizar rutina:", error);
            throw error;
        }
    };

    return (
        <DetalleRutinaContext.Provider
            value={{
                detalles,
                getDetalleRutina,
                fetchDetallesRutina,
                createDetalleRutina,
                deleteDetalleRutina,
                updateDetalleRutina,
                updateProgresoEjercicio,
                updateRutinaProgress,
            }}
        >
            {children}
        </DetalleRutinaContext.Provider>
    );
}
