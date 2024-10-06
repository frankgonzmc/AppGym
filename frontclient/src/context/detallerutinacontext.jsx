import { createContext, useContext, useState } from "react";
import axios from '../api/axios';
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
    updateDetalleRutinaRequest, // Cambié el nombre de la importación para no confundir con la función que defines más abajo
    updateRutinaProgress, // Asegúrate de que esto esté exportado correctamente
} from "../api/detallerutina"; // Verifica que esta ruta sea correcta

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
            throw error; // Lanza el error para que se maneje en otro lugar si es necesario
        }
    };

    // Obtener detalles de rutina
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
            console.error('Error al crear detalle de rutina:', error.response ? error.response.data : error.message);
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

    const updateDetalleRutina = async (id, data) => { // Renombré a updateDetalleRutina para evitar confusión
        try {
            const response = await axios.put(`/detalles-rutinas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar detalle:', error);
            throw error;
        }
    };

    // Actualizar progreso del ejercicio dentro de DetalleRutina
    const updateProgresoEjercicio = async (rutinaId, ejercicioId, datos) => {
        try {
            const updatedData = {
                ejercicio: ejercicioId,
                seriesProgreso: datos.seriesCompletadas || 0,
                ejerciciosCompletados: datos.ejerciciosCompletados,
                estado: (datos.seriesCompletadas >= datos.ejercicio.series) ? 'Completado' : 'En Progreso',
            };

            console.log("Datos a enviar:", updatedData);

            // Actualizar detalle de rutina
            const detalleActualizado = await updateDetalleRutinaRequest(ejercicioId, updatedData); // Cambié a la función renombrada

            // Lógica para actualizar el estado de la rutina
            const rutinaActualizada = await updateRutinaProgress(rutinaId);

            return { detalleActualizado, rutinaActualizada };
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error.response ? error.response.data : error);
        }
    };

    // Nueva función para actualizar la rutina
    const updateRutinaProgress = async (rutinaId) => {
        try {
            const detallesResponse = await getDetalleRutinaRequest(rutinaId); // Cambié el nombre de la variable para mayor claridad
            const ejerciciosCompletos = detallesResponse.data.filter(detalle => detalle.estado === 'Completado').length;

            const res = await axios.put(`/rutinas/${rutinaId}`, { ejerciciosCompletos });
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
