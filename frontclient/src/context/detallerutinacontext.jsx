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
            const res = await deleteDetalleRutinaRequest(id);
            if (res.status === 204) {
                setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle.ejercicio._id !== id));
            } else {
                throw new Error("No se pudo eliminar el ejercicio"); // Manejo de errores si no es 204
            }
        } catch (error) {
            console.log("Error al eliminar el detalle de rutina:", error);
            throw error; // Lanza el error para manejarlo en el componente
        }
    };


    // Actualizar progreso del ejercicio dentro de DetalleRutina
    const updateProgresoEjercicio = async (id, updatedData) => {
        try {
            const res = await updateDetalleRutinaRequest(id, updatedData);
            setDetalles(prevDetalles =>
                prevDetalles.map(detalle =>
                    detalle._id === id ? { ...detalle, ...updatedData } : detalle
                )
            );
        } catch (error) {
            console.error("Error al actualizar progreso del ejercicio:", error);
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
