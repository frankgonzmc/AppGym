import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
    getDetalleRutinaRequest,
    updateDetalleRutinaRequest,
} from "../api/detallerutina"; // Asegúrate de crear este archivo en api/

const DetalleRutinaContext = createContext();


// Obtener detalles de rutina
export const fetchDetallesRutina = async (id) => {
    try {
        const response = await getDetalleRutinaRequest(id);
        return response.data; // Devuelve los detalles obtenidos
    } catch (error) {
        console.error("Error al obtener detalles de rutina:", error);
    }
};

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
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error('Error al crear detalle de rutina:', error.response ? error.response.data : error.message);
        }
    };

    // Eliminar detalle de rutina
    const deleteDetalleRutina = async (id) => {
        try {
            const res = await deleteDetalleRutinaRequest(id);
            if (res.status === 204) {
                console.log("Detalle eliminado con éxito");
            }
        } catch (error) {
            console.error("Error al eliminar detalle de rutina:", error);
        }
    };



    /*
    const deleteDetalleRutina = async (id) => {
        try {
            const res = await deleteDetalleRutinaRequest(id);
            if (res.status === 204) {
                setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };*/

    const updateDetalleRutina = async (id, detalle) => {
        try {
            const response = await updateDetalleRutinaRequest(id, detalle);
            return response.data; // Devuelve el detalle actualizado
        } catch (error) {
            console.error("Error al actualizar detalle de rutina:", error);
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
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}