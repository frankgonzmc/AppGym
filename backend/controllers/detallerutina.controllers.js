import DetalleRutina from '../models/detallerutina.model.js';

// Actualizar un detalle de rutina existente
export const updateDetalleRutina = async (req, res) => {
    try {
        const detalle = await DetalleRutina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar detalle de rutina", error });
    }
};

// Eliminar un detalle de rutina existente
export const deleteDetalleRutina = async (req, res) => {
    try {
        const detalle = await DetalleRutina.findByIdAndDelete(req.params.id);
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json({ message: "Detalle eliminado con éxito", detalle });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar detalle", error });
    }
};