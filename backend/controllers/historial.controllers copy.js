import Historial from '../models/historial.model.js';

export const getHistorial = async (req, res) => {
    try {
        const historial = await Historial.find({
            user: req.user.id,
            rutina: req.params.id, // O req.rutina._id si ya tienes la rutina en req.rutina
        }).populate('user').populate('rutina');

        if (!historial || historial.length === 0) {
            return res.status(404).json({ message: "Historial no encontrado..." });
        }

        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial", error });
    }
};
