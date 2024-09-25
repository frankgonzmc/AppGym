import { createContext, useContext, useState } from "react";
import {
    createDetalleRutinaRequest,
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

    return (
        <DetalleRutinaContext.Provider value={{ detalles, createDetalleRutina }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}