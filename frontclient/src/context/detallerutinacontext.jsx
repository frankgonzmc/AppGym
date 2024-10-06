import { createContext, useContext, useState } from "react";
import axios from '../../api/axios'
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
    updateRutinaProgress,
    updateDetalleRutinaRequest,
} from "../api/detallerutina"; // Asegúrate de crear este archivo en api/

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
            console.error(error);
        }
    };

    // Obtener detalles de rutina
    const fetchDetallesRutina = async (id) => {
        try {
            const response = await getDetalleRutinaRequest(id);
            setDetalles(response.data); // Asegúrate de que esto esté configurando el estado correctamente
        } catch (error) {
            console.error("Error al obtener detalles de rutina:", error);
        }
    };

    const createDetalleRutina = async (detalle) => {
        try {
            const res = await createDetalleRutinaRequest(detalle);
            setDetalles(prevDetalles => [...prevDetalles, res.data]); // Agregar nuevo detalle al estado
            return res.data;
        } catch (error) {
            console.error('Error al crear detalle de rutina:', error.response ? error.response.data : error.message);
            throw error; // Lanza el error para manejarlo más arriba si es necesario
        }
    };

    const deleteDetalleRutina = async (id) => {
        try {
            await deleteDetalleRutinaRequest(id); // Llama a tu API para eliminar
            setDetalles((prev) => prev.filter((detalle) => detalle._id !== id)); // Actualiza el estado
        } catch (error) {
            console.error("Error al eliminar detalle de rutina:", error);
        }
    };
    
    const updateDetalleRutinaRequest = async (id, data) => {
        try {
            const response = await axios.put(`/detalles-rutinas/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar detalle:', error);
            throw error; // Para manejar el error en el contexto
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
            const detalleActualizado = await updateDetalleRutinaRequest(ejercicioId, updatedData);
    
            // Lógica para actualizar el estado de la rutina
            const rutinaActualizada = await updateRutinaProgress(rutinaId); // Nueva función para actualizar la rutina
    
            return { detalleActualizado, rutinaActualizada }; // Retornar los datos actualizados si es necesario
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error.response ? error.response.data : error);
        }
    };
    
    // Nueva función para actualizar la rutina
    const updateRutinaProgress = async (rutinaId) => {
        try {
            // Obtener todos los detalles de rutina
            const detalles = await getDetalleRutinaRequest(rutinaId); // Obtener detalles de la rutina
    
            // Contar cuántos ejercicios están completos
            const ejerciciosCompletos = detalles.data.filter(detalle => detalle.estado === 'Completado').length;
    
            // Actualizar la rutina con el número de ejercicios completados
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
                updateDetalleRutinaRequest,
                updateRutinaProgress,
                updateProgresoEjercicio, // Añadido para manejar el progreso
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}
