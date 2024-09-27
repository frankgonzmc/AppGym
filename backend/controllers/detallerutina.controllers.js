import DetallesRutina from '../models/detallerutina.model.js';

export const createDetalleRutina = async (req, res) => {
    try {
        const { rutina, ejercicio, orden, series, repeticiones, duracion } = req.body;

        const nuevoDetalleRutina = new DetallesRutina({
            rutina,
            ejercicio,
            orden,
            series,
            repeticiones,
            duracion,
        });

        const detalleGuardado = await nuevoDetalleRutina.save();
        res.status(201).json(detalleGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el detalle de la rutina", error });
    }
};

// Actualizar un detalle de rutina existente
export const updateDetalleRutina = async (req, res) => {
    try {
        const detalle = await DetallesRutina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar detalle de rutina", error });
    }
};

// Eliminar un detalle de rutina existente
export const deleteDetalleRutina = async (req, res) => {
    try {
        const detalle = await DetallesRutina.findByIdAndDelete(req.params.id);
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json({ message: "Detalle eliminado con éxito", detalle });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar detalle", error });
    }
};