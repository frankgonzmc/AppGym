import Progresos from '../models/progreso.model.js';

export const getProgreso = async (req, res) => {
    try {
        const progreso = await Progresos.find({
            user: req.user.id,
            rutina: req.params.id, // O req.rutina._id si ya tienes la rutina en req.rutina
        }).populate('user').populate('rutina');

        if (!progreso || progreso.length === 0) {
            return res.status(404).json({ message: "Progreso no encontrado..." });
        }

        res.json(progreso);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener progreso", error });
    }
};
