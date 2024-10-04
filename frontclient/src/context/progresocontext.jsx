import { createContext, useContext, useState } from "react";
import { getRutinaRequest } from "../api/rutina"; // Asegúrate de que la función esté definida correctamente
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
    const [progreso, setProgreso] = useState([]);
    const [errors, setErrors] = useState([]);

    const getProgreso = async (id) => {
        try {
            const progreso = await getProgresoRequest(id);
            const rutina = await getRutinaRequest(id);

            // Si 'rutina' o 'detalles' no existen, devuelve un array vacío
            const ejercicios = rutina?.detalles?.length
                ? rutina.detalles.map(detalle => detalle.ejercicio)
                : [];

            return { progreso, ejercicios };
        } catch (error) {
            console.error("Error al obtener progreso o rutina:", error);
            return { progreso: null, ejercicios: [] };
        }
    };



    const createProgreso = async (progreso) => {
        try {
            const res = await createProgresoRequest(progreso);
            console.log(res.data);
            return res.data; // Devolver la rutina creada
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const deleteProgreso = async (id) => {
        try {
            const res = await deleteProgresoRequest(id);
            if (res.status === 204) {
                setDetalles(prevDetalles => prevDetalles.filter(detalle => detalle._id !== id));
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

    const updateProgresoEjercicio = (id, progresoEjercicio) => {
        setProgreso((prevProgreso) => ({
            ...prevProgreso,
            [id]: progresoEjercicio, // actualizar progreso de un ejercicio en específico
        }));
    };

    const updateProgresoRutina = (id, progresoRutina) => {
        setRutinas((prevRutinas) =>
            prevRutinas.map((rutina) =>
                rutina._id === id
                    ? { ...rutina, progreso: progresoRutina }
                    : rutina
            )
        );
    };

    return (
        <ProgresoContext.Provider
            value={{
                progreso,
                setProgreso,
                getProgreso,
                createProgreso,
                deleteProgreso,
                updateProgreso,
                updateProgresoEjercicio,
                updateProgresoRutina,
            }}
        >
            {children}
        </ProgresoContext.Provider>
    );
}