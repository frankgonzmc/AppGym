import { createContext, useContext, useState } from "react";
import {
    getHistorialRequest,
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
            console.error(error);
        }
    };

    return (
        <HistorialContext.Provider
            value={{
                historials,
                setHistorials,
                getHistorial,
            }}
        >
            {children}
        </HistorialContext.Provider>
    );
}