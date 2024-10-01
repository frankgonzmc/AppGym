import Progreso from '../models/progreso.model.js';

export const getProgreso = async (req, res) => {
    try {
        const progreso = await Progreso.find({
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

export const createProgreso = async (req, res) => {
    try {
        const { rutina, fecha, estado } = req.body;

        const nuevoProgreso = new Progreso({
            user: req.user.id,
            rutina, //req.params.id,
            fecha,
            estado,
        });

        const progresoGuardado = await nuevoProgreso.save();
        res.status(201).json(progresoGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el detalle de la rutina", error });
    }
};

// Eliminar un progreso del usuario existente
export const deleteProgreso = async (req, res) => {
    try {
        const progreso = await Progreso.findByIdAndDelete(req.params.id);
        if (!progreso) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json({ message: "Progreso eliminado con éxito", progreso });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar detalle", error });
    }
};

export const updateProgreso = async (req, res) => {
    try {
        const progreso = await Progreso.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!progreso) return res.status(404).json({ message: "progreso no encontrado..." })
        res.json(progreso)
    } catch (error) {
        return res.status(404).json({ message: "progreso no encontrado..." });
    }
};