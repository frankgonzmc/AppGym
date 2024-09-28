import { createContext, useContext, useState } from "react";
import {
    getHistorialRequest,
    createHistorialRequest,
    deleteHistorialRequest,
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

    const createHistorial  = async (historial) => {
        try {
            const res = await createHistorialRequest(historial);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: error.message }; // Retornar un mensaje de error
        }
    };

    const deleteHistorial  = async (id) => {
        try {
            const res = await deleteHistorialRequest(id);
            if (res.status === 204) {
                //setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
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
            }}
        >
            {children}
        </HistorialContext.Provider>
    );
}