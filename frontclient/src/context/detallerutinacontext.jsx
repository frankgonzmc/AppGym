import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
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
            return response.data; // Devuelve los detalles obtenidos
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

    // Actualizar progreso del ejercicio dentro de DetalleRutina
    const updateProgresoEjercicio = async (rutinaId, ejercicioId, datos) => {
        try {
            if (!datos.rutinaId) {
                console.error("rutinaId no está definido");
                return;
            }
    
            const updatedData = {
                rutina: rutinaId,
                ejercicio: ejercicioId,
                seriesProgreso: datos.seriesCompletadas || 0,
                estado: (datos.seriesCompletadas >= detalles.ejercicio.series) ? 'Completado' : 'En Progreso'
            };
    
            console.log("Datos a enviar:", updatedData);
    
            const res = await updateDetalleRutinaRequest(datos.rutinaId, ejercicioId, updatedData); 
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error.response ? error.response.data : error);
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
                updateProgresoEjercicio, // Añadido para manejar el progreso
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}
