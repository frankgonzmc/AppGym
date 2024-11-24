import { createContext, useContext, useState, useCallback } from "react";
import { getRutinasRequest, deleteRutinaRequest, createRutinaRequest, getRutinaRequest, updateRutinaRequest } from "../api/rutina";
import { createDetalleRutinaRequest } from "../api/detallerutina";
import { showConfirmation } from "../components/alerts/utils-alerts";

const RutinaContext = createContext();

export const useRutinas = () => {
    const context = useContext(RutinaContext);
    if (!context) throw new Error("useRutinas debe estar dentro de un RutinaProvider");
    return context;
};

export function RutinaProvider({ children }) {
    const [rutinas, setRutinas] = useState([]); // Inicializa en un array vacío
    const [cargado, setCargado] = useState(false); // Nueva bandera para evitar llamadas repetidas

    const getRutinas = useCallback(async () => {
        try {
            const res = await getRutinasRequest();
            if (res.status === 200 && Array.isArray(res.data)) {
                setRutinas(res.data);
            } else {
                setRutinas([]);
            }
        } catch (error) {
            console.error("Error al obtener rutinas:", error.response?.data || error.message);
            setRutinas([]); // Maneja error sin mostrar como fallo fatal
        }
    }, []);

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
            setRutinas((prev) => [...prev, res.data]); // Añadir la nueva rutina al estado
            return res.data; // Devolver la rutina creada
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
                prev.map((r) => (r._id === id ? { ...r, ...res.data } : r))
            );
        } catch (error) {
            console.error('Error al actualizar rutina:', error.response?.data || error.message);
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
