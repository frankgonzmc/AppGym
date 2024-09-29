import { createContext, useContext, useState } from "react";
import {
    getProgresoRequest,
    createProgresoRequest,
    deleteProgresoRequest,
    updateProgresoRequest,
} from "../api/progreso";


const ProgresoContext = createContext();

export const useProgreso = () => {
    const context = useContext(ProgresoContext);

    if (!context) throw new Error("useProgreso debe estar dentro de un ProgresoProvider");
    return context;

}

export function ProgresoProvider({ children }) {
    const [progresos, setProgresos] = useState([]);

    const getProgreso = async (id) => {
        try {
            const res = await getProgresoRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const createProgreso = async (progreso) => {
        try {
            const res = await createProgresoRequest(progreso);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProgreso = async (id) => {
        try {
            const res = await deleteProgresoRequest(id);
            if (res.status === 204) {
                //setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateProgreso = async (id, progreso) => {
        try {
            await updateProgresoRequest(id, progreso);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ProgresoContext.Provider
            value={{
                progresos,
                setProgresos,
                getProgreso,
                createProgreso,
                deleteProgreso,
                updateProgreso,
            }}
        >
            {children}
        </ProgresoContext.Provider>
    );
}