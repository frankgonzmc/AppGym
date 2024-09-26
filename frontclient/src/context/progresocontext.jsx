import { createContext, useContext, useState } from "react";
import {
    getProgresoRequest,
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

    return (
        <ProgresoContext.Provider
            value={{
                progresos,
                setProgresos,
                getProgreso,
            }}
        >
            {children}
        </ProgresoContext.Provider>
    );
}