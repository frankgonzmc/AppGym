import Historial from '../models/historial.model.js';

export const getHistorial = async (req, res) => {
    try {
        const historial = await Historial.find({
            user: req.user.id,
            rutina: req.params.id, // O req.rutina._id si ya tienes la rutina en req.rutina
        }).populate('user').populate('rutina');

        if (!historial || historial.length === 0) {
            return res.status(404).json({ message: "historial no encontrado..." });
        }

        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial", error });
    }
};

export const createHistorial = async (req, res) => {
    try {
        const { rutina, fecha } = req.body;

        const nuevoHistorial = new Historial({
            user: req.user.id,
            rutina,
            fecha,
        });

        const historialGuardado = await nuevoHistorial.save();
        res.status(201).json(historialGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el historial del usuario", error });
    }
};

// Eliminar un progreso del usuario existente
export const deleteHistorial = async (req, res) => {
    try {
        const historial = await Historial.findByIdAndDelete(req.params.id);
        if (!historial) return res.status(404).json({ message: "historial no encontrado..." });

        res.json({ message: "historial eliminado con éxito", progreso });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el historial", error });
    }
};

export const updateHistorial = async (req, res) => {
    try {
        const historial = await Historial.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!historial) return res.status(404).json({ message: "historial no encontrado..." })
        res.json(historial)
    } catch (error) {
        return res.status(404).json({ message: "historial no encontrado..." });
    }
};