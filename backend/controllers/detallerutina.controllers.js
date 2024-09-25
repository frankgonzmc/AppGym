import DetalleRutina from '../models/detallerutina.model.js';

// Obtener todos los detalles de rutina por ID de rutina
export const getDetallesRutina = async (req, res) => {
    try {
        const detalles = await DetalleRutina.find({ rutina: req.params.id }).populate('ejercicio');
        res.json(detalles);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener detalles de rutina", error });
    }
};

// Crear un nuevo detalle de rutina
export const createDetalleRutina = async (req, res) => {
    const { rutina, ejercicio, orden, series, repeticiones, duracion } = req.body;

    try {
        const newDetalle = new DetalleRutina({
            rutina,
            ejercicio,
            orden,
            series,
            repeticiones,
            duracion
        });

        const savedDetalle = await newDetalle.save();
        res.status(201).json(savedDetalle);
    } catch (error) {
        res.status(500).json({ message: "Error al crear detalle de rutina", error });
    }
};

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