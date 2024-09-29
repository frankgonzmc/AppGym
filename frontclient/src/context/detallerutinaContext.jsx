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
            console.log(error);
        }
    };

    const createDetalleRutina = async (detalles) => {
        try {
            const res = await createDetalleRutinaRequest(detalle);
            setDetalles([...detalles, res.data]);
            return res.data;
        } catch (error) {
            console.log(error);
            return { error: error.message }; // Retornar un mensaje de error
        }
    };

    const deleteDetalleRutina = async (id) => {
        try {
            const res = await deleteDetalleRutinaRequest(id);
            if (res.status === 204) {
                setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateDetalleRutina = async (id, detalles) => {
        try {
            await updateDetalleRutinaRequest(id, detalles);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DetalleRutinaContext.Provider
            value={{
                detalles,
                createDetalleRutina,
                deleteDetalleRutina,
                getDetalleRutina,
                updateDetalleRutina,
            }}>
            {children}
        </DetalleRutinaContext.Provider>
    );
}