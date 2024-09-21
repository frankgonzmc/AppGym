import { createContext, useContext, useState } from "react";
import {
    createRutinaRequest,
    deleteRutinaRequest,
    getRutinaRequest,
    getRutinasRequest,
    updateRutinaRequest,
} from "../api/rutina";

const RutinaContext = createContext();

export const useRutinas = () => {
    const context = useContext(RutinaContext);
    if (!context) throw new Error("useRutinas debe estar dentro de un RutinaProvider");
    return context;
};

export function RutinaProvider({ children }) {
    const [rutinas, setRutinas] = useState([]);

    const getRutinas = async () => {
        try {
            const res = await getRutinasRequest();
            setRutinas(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRutina = async (id) => {
        try {
            const res = await deleteRutinaRequest(id);
            if (res.status === 204) setRutinas(rutinas.filter((rutina) => rutina._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createRutina = async (rutina) => {
        try {
            const res = await createRutinaRequest(rutina);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getRutina = async (id) => {
        try {
            const res = await getRutinaRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateRutina = async (id, rutina) => {
        try {
            await updateRutinaRequest(id, rutina);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <RutinaContext.Provider
            value={{
                rutinas,
                getRutina,
                deleteRutina,
                createRutina,
                getRutinas,
                updateRutina,
            }}
        >
            {children}
        </RutinaContext.Provider>
    );
}
