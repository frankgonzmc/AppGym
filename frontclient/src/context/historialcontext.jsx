import { createContext, useContext, useState } from "react";
import {
    getHistorialRequest,
    createHistorialRequest,
    deleteHistorialRequest,
    updateHistorialRequest,
} from "../api/historial";


const HistorialContext = createContext();

export const useHistorial = () => {
    const context = useContext(HistorialContext);

    if (!context) throw new Error("useHistorial debe estar dentro de un HistorialProvider");
    return context;

}

export function HistorialProvider({ children }) {
    const [historials, setHistorials] = useState([]);

    const getHistorial = async (id) => {
        try {
            const res = await getHistorialRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const createHistorial = async (historial) => {
        try {
            const res = await createHistorialRequest(historial);
            return res.data;
        } catch (error) {
            if (error.response) {
                // Si hay una respuesta del servidor
                console.error('Error al crear historial:', error.response.data);
            } else if (error.request) {
                // Si se hizo la solicitud pero no hubo respuesta
                console.error('Error en la solicitud:', error.request);
            } else {
                // Cualquier otro tipo de error
                console.error('Error desconocido --> SE ACTIVO EL ELSE <-- :', error.message);
            }
            return { error: error.message }; // Retornar un mensaje de error
        }
    };
    

    const updateHistorial = async (id, historial) => {
        try {
            await updateHistorialRequest(id, historial);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHistorial = async (id) => {
        try {
            const res = await deleteHistorialRequest(id);
            if (res.status === 204) {
                setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <HistorialContext.Provider
            value={{
                historials,
                setHistorials,
                getHistorial,
                deleteHistorial,
                createHistorial,
                updateHistorial,
            }}
        >
            {children}
        </HistorialContext.Provider>
    );
}