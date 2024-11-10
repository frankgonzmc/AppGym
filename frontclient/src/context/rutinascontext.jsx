import { createContext, useContext, useState } from "react";
import { getRutinasRequest, deleteRutinaRequest, createRutinaRequest, getRutinaRequest, updateRutinaRequest } from "../api/rutina"
import { createDetalleRutinaRequest } from "../api/detallerutina"

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
            setRutinas((prev) => [...prev, res.data]); // Añadir la nueva rutina al estado
            console.log(res.data);
            return res.data; // Devolver la rutina creada
        } catch (error) {
            console.error(error.response.data);
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
            console.error(error);
        }
    };

    const updateRutina = async (id, rutina) => {
        try {
            const res = await updateRutinaRequest(id, rutina);
            setRutinas((prev) =>
                prev.map((rutina) => (rutina._id === id ? { ...rutina, ...res.data } : rutina))
            );
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
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
