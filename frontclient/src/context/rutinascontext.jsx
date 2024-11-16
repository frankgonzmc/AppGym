import { createContext, useContext, useState, useCallback } from "react";
import { getRutinasRequest, deleteRutinaRequest, createRutinaRequest, getRutinaRequest, updateRutinaRequest } from "../api/rutina";
import { createDetalleRutinaRequest } from "../api/detallerutina";

const RutinaContext = createContext();

export const useRutinas = () => {
    const context = useContext(RutinaContext);
    if (!context) throw new Error("useRutinas debe estar dentro de un RutinaProvider");
    return context;
};

export function RutinaProvider({ children }) {
    const [rutinas, setRutinas] = useState([]); // Inicializa en un array vacío
    const [cargado, setCargado] = useState(false); // Nueva bandera para evitar llamadas repetidas

    const reloadRutinas = async () => {
        try {
            const res = await getRutinasRequest(); // Llama a la API para recargar rutinas
            if (Array.isArray(res.data)) {
                setRutinas(res.data);
                setCargado(true); // Marca como cargado
            } else {
                console.error("Error: La respuesta de 'getRutinasRequest' no es un array.");
                setRutinas([]);
            }
        } catch (error) {
            console.error("Error al recargar rutinas:", error);
            setRutinas([]);
        }
    };

    const getRutinas = useCallback(async () => {
        try {
            if (!cargado) {
                const res = await getRutinasRequest();
                console.log("Respuesta de getRutinasRequest:", res.data); // Verifica la respuesta de la API
                if (Array.isArray(res.data)) {
                    setRutinas(res.data);
                    setCargado(true); // Marca como cargado después de obtener los datos
                    return res.data;
                } else {
                    console.error("Error: La respuesta de 'getRutinasRequest' no es un array.");
                    setRutinas([]); // Vacía el estado si la respuesta no es válida
                    return [];
                }
            } else {
                console.log("Rutinas ya cargadas. Retornando el estado actual.");
                return rutinas; // Devuelve el estado actual si ya fue cargado
            }
        } catch (error) {
            console.error("Error al obtener rutinas:", error);
            setRutinas([]); // Vacía el estado en caso de error
            return [];
        }
    }, [cargado, rutinas]); // `rutinas` es una dependencia para devolver siempre el estado actual

    const deleteRutina = async (id) => {
        try {
            const res = await deleteRutinaRequest(id);
            if (res.status === 204) setRutinas(rutinas.filter((rutina) => rutina._id !== id));
        } catch (error) {
            console.log("Error al eliminar rutina:", error);
        }
    };

    const createRutina = async (rutina) => {
        try {
            const res = await createRutinaRequest(rutina);
            if (res.data) {
                await reloadRutinas(); // Recarga las rutinas después de crear una
                return res.data;
            }
        } catch (error) {
            console.error("Error al crear rutina:", error.response?.data || error.message);
        }
    };

    const createDetalleRutina = async (detalle) => {
        try {
            await createDetalleRutinaRequest(detalle);
        } catch (error) {
            console.error("Error al crear detalle de rutina:", error);
        }
    };

    const getRutina = async (id) => {
        try {
            const res = await getRutinaRequest(id);
            return res.data;
        } catch (error) {
            console.error("Error al obtener rutina:", error);
        }
    };

    const updateRutina = async (id, rutina) => {
        try {
            const res = await updateRutinaRequest(id, rutina);
            setRutinas((prev) =>
                prev.map((rutina) => (rutina._id === id ? { ...rutina, ...res.data } : rutina))
            );
        } catch (error) {
            console.error("Error al actualizar rutina:", error.response ? error.response.data : error.message);
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
                createDetalleRutina,
            }}
        >
            {children}
        </RutinaContext.Provider>
    );
}
