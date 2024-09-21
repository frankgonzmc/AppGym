import { createContext, useContext, useState } from "react";
import {
    createEjercicioRequest,
    deleteEjercicioRequest,
    getEjercicioRequest,
    getEjerciciosRequest,
    updateEjercicioRequest,
} from "../api/ejercicio";

const EjercicioContext = createContext();

export const useEjercicios = () => {
    const context = useContext(EjercicioContext);
    if (!context) throw new Error("useEjercicio debe estar dentro de un EjercicioProvider");
    return context;
};

export function EjercicioProvider({ children }) {
    const [ejercicio, setEjercicio] = useState([]);

    const getEjercicios = async () => {
        try {
            const res = await getEjerciciosRequest();
            setEjercicio(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEjercicio = async (id) => {
        try {
            const res = await deleteEjercicioRequest(id);
            if (res.status === 204) setEjercicio(ejercicio.filter((ejercicio) => ejercicio._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createEjercicio = async (ejercicio) => {
        try {
            const res = await createEjercicioRequest(ejercicio);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getEjercicio = async (id) => {
        try {
            const res = await getEjercicioRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateEjercicio = async (id, ejercicio) => {
        try {
            await updateEjercicioRequest(id, ejercicio);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <EjercicioContext.Provider
            value={{
                ejercicio,
                getEjercicios,
                deleteEjercicio,
                createEjercicio,
                getEjercicio,
                updateEjercicio,
            }}
        >
            {children}
        </EjercicioContext.Provider>
    );
}
