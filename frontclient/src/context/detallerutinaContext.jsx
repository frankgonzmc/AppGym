import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
    deleteDetalleRutinaRequest,
} from "../api/detallerutina"; // Asegúrate de crear este archivo en api/

const DetalleRutinaContext = createContext();

export const useDetallesRutina = () => {
    const context = useContext(DetalleRutinaContext);
    if (!context) throw new Error("useDetallesRutina debe estar dentro de un DetalleRutinaProvider");
    return context;
};

export function DetalleRutinaProvider({ children }) {
    const [detalles, setDetalles] = useState([]);

    const createDetalleRutina = async (detalle) => {
        try {
            const res = await createDetalleRutinaRequest(detalle);
            setDetalles([...detalles, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteDetalleRutina = async (id) => {
        try {
            const res = await deleteDetalleRutinaRequest(id);
            if (res.status === 204) setEjercicios(ejercicios.filter((ejercicio) => ejercicio._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DetalleRutinaContext.Provider
            value={{
                detalles,
                createDetalleRutina,
                deleteDetalleRutina
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}