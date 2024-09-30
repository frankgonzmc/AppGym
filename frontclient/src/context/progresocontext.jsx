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
        const progreso = await getProgresoRequest(id);
        const rutina = await getRutina(id); // Obtén los detalles de la rutina
        return { progreso, ejercicios: rutina.detalles.map(detalle => detalle.ejercicio) };
    };
    

    const createProgreso = async (progreso) => {
        try {
            const res = await createProgresoRequest(progreso);
            console.log(res.data);
        } catch (error) {
            if (error.response) {
                // Si hay una respuesta del servidor
                console.error('Error al crear progreso:', error.response.data);
            } else if (error.request) {
                // Si se hizo la solicitud pero no hubo respuesta
                console.error('Error en la solicitud:', error.request);
            } else {
                // Cualquier otro tipo de error
                console.error('Error desconocido -> ELSE ENCONTRADO:', error.message);
            }
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