import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
    updateProgresoEjercicioRequest,
    updateDetalleRutinaRequest,
    updateRutinaProgressRequest,
} from "../api/detallerutina";

const DetalleRutinaContext = createContext();

export const useDetallesRutina = () => {
    const context = useContext(DetalleRutinaContext);
    if (!context) throw new Error("useDetallesRutina debe estar dentro de un DetalleRutinaProvider");
    return context;
};

export function DetalleRutinaProvider({ children }) {
    const [detalles, setDetalles] = useState([]);

    const getDetalleRutina = async (id) => {
        try {
            const res = await getDetalleRutinaRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener detalle de rutina:", error);
            throw error;
        }
    };

    const fetchDetallesRutina = async (id) => {
        try {
            const response = await getDetalleRutinaRequest(id);
            setDetalles(response.data);
        } catch (error) {
            console.error("Error al obtener detalles de rutina:", error);
        }
    };

    const createDetalleRutina = async (detalle) => {
        try {
            const res = await createDetalleRutinaRequest(detalle);
            setDetalles(prevDetalles => [...prevDetalles, res.data]);
            return res.data;
        } catch (error) {
            console.error('Error al crear detalle de rutina:', error.response?.data || error.message);
            throw error;
        }
    };

    const deleteDetalleRutina = async (id) => {
        try {
            await deleteDetalleRutinaRequest(id);
            setDetalles(prev => prev.filter(detalle => detalle._id !== id));
        } catch (error) {
            console.error("Error al eliminar detalle de rutina:", error);
        }
    };

    const updateDetalleRutina = async (id, data) => {
        try {
            const response = await updateDetalleRutinaRequest(id, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar detalle:', error);
            throw error;
        }
    };

    const updateProgresoEjercicio = async (rutinaId, ejercicioId, datos) => {
        try {
            const updatedData = {
                ejercicio: ejercicioId,
                seriesProgreso: datos.seriesCompletadas || 0,
                ejerciciosCompletados: datos.ejerciciosCompletados,
                estado: (datos.seriesCompletadas >= datos.ejercicio.series) ? 'Completado' : 'En Progreso',
            };

            console.log("Datos a enviar:", updatedData);

            const detalleActualizado = await updateProgresoEjercicioRequest(ejercicioId, updatedData.seriesProgreso);

            const rutinaActualizada = await updateRutinaProgress(rutinaId);

            return { detalleActualizado, rutinaActualizada };
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error.response?.data || error);
        }
    };

    const updateRutinaProgress = async (rutinaId) => {
        try {
            const detallesResponse = await getDetalleRutinaRequest(rutinaId);
            const ejerciciosCompletos = detallesResponse.data.filter(detalle => detalle.estado === 'Completado').length;

            const res = await updateRutinaProgressRequest(rutinaId, ejerciciosCompletos);
            return res.data;
        } catch (error) {
            console.error("Error al actualizar rutina:", error);
            throw error;
        }
    };

    return (
        <DetalleRutinaContext.Provider
            value={{
                detalles,
                createDetalleRutina,
                deleteDetalleRutina,
                getDetalleRutina,
                fetchDetallesRutina,
                updateDetalleRutina,
                updateProgresoEjercicio,
                updateRutinaProgress,
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}
