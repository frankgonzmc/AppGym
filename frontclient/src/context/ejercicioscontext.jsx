import { createContext, useContext, useState } from "react";
import {
    createEjerciciosRequest,
    deleteEjerciciosRequest,
    updateEjerciciosRequest,
    getEjerciciosRequest,
    getEjercicioRequest,
} from "../api/ejercicio";


const EjercicioContext = createContext();

export const useEjercicios = () => {
    const context = useContext(EjercicioContext);
    if (!context) throw new Error("useEjercicio debe estar dentro de un EjercicioProvider");
    return context;
};

export function EjercicioProvider({ children }) {
    const [ejercicios, setEjercicios] = useState([]);

    const getEjercicios = async () => {
        try {
            const res = await getEjerciciosRequest();
            setEjercicios(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteEjercicio = async (id) => {
        try {
            const res = await deleteEjerciciosRequest(id);
            if (res.status === 204) setEjercicios(ejercicios.filter((ejercicio) => ejercicio._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createEjercicio = async (ejercicio) => {
        try {
            const res = await createEjerciciosRequest(ejercicio);
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
            await updateEjerciciosRequest(id, ejercicio);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <EjercicioContext.Provider
            value={{
                ejercicios,
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
