import Progreso from '../models/progreso.model.js';
import User from '../models/user.model.js';
import Rutinas from '../models/rutina.model.js';

// Obtener un progreso del usuario existente
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

// Crear un nuevo progreso del usuario existente
export const createProgreso = async (req, res) => {
    try {
        const { rutina, fecha, estado } = req.body;

        const nuevoProgreso = new Progreso({
            user: req.user.id,
            rutina,
            fecha,
            estado,
        });

        const progresoGuardado = await nuevoProgreso.save();

        res.status(201).json(progresoGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear progreso", error });
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

// Actualizar un progreso del usuario existente
export const updateProgreso = async (req, res) => {
    try {
        const { ejerciciosCompletados, caloriasQuemadas } = req.body;

        const progreso = await Progreso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!progreso) return res.status(404).json({ message: "Progreso no encontrado" });

        // Actualiza estadísticas del usuario
        const user = await User.findById(progreso.user);
        if (user) {
            user.ejerciciosCompletados += ejerciciosCompletados || 0;
            user.caloriasQuemadas += caloriasQuemadas || 0;
            await user.save();

            // Verifica si el usuario debe subir de nivel
            await actualizarNivelUsuario(user._id);
        }

        res.json(progreso);
    } catch (error) {
        console.error("Error actualizando progreso:", error);
        res.status(500).json({ message: "Error al actualizar progreso", error });
    }
};

// Obtener estadísticas del progreso del usuario existente
export const getUserStats = async (req, res) => {
    try {
        const { userId } = req.params;
        const stats = await Progreso.aggregate([
            { $match: { user: userId } },
            { $group: { _id: { month: { $month: "$fecha" } }, total: { $sum: 1 } } }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener estadísticas del progreso por período (mensual, semanal, etc.) del usuario existente
export const getUserStatsByPeriod = async (req, res) => {
    const { userId, period } = req.params;
    const matchStage = { user: userId };
    const groupStage = { _id: { year: { $year: "$fecha" } }, total: { $sum: 1 } };

    if (period === 'monthly') groupStage._id.month = { $month: "$fecha" };
    if (period === 'weekly') groupStage._id.week = { $week: "$fecha" };

    try {
        const stats = await Progreso.aggregate([{ $match: matchStage }, { $group: groupStage }]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Comparar el progreso con objetivos del usuario existente
export const compareProgressWithGoals = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const progreso = await Progreso.find({ user: userId, estado: 'Completo' }).countDocuments();

    const message = progreso >= user.objetivos ?
        "Estás en buen camino" : "Considera aumentar tu intensidad";
    res.json({ progreso, message });
};