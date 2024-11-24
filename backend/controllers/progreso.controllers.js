import Progreso from '../models/progreso.model.js';
import User from '../models/user.model.js';
import Rutinas from '../models/rutina.model.js';

// Obtener progreso de un usuario para una rutina específica
export const getProgreso = async (req, res) => {
    try {
        const progreso = await Progreso.find({
            user: req.user.id,
            rutina: req.params.id,
        }).populate('user').populate('rutina');

        if (!progreso || progreso.length === 0) {
            return res.status(404).json({ message: "Progreso no encontrado." });
        }

        res.json(progreso);
    } catch (error) {
        console.error("Error al obtener progreso:", error);
        res.status(500).json({ message: "Error al obtener progreso.", error });
    }
};

// Crear un nuevo progreso para una rutina específica
export const createProgreso = async (req, res) => {
    try {
        const { rutina, estado } = req.body;

        const nuevoProgreso = new Progreso({
            user: req.user.id,
            rutina,
            estado,
        });

        const progresoGuardado = await nuevoProgreso.save();
        res.status(201).json(progresoGuardado);
    } catch (error) {
        console.error("Error al crear progreso:", error);
        res.status(500).json({ message: "Error al crear progreso.", error });
    }
};

// Eliminar un progreso existente
export const deleteProgreso = async (req, res) => {
    try {
        const progreso = await Progreso.findByIdAndDelete(req.params.id);
        if (!progreso) {
            return res.status(404).json({ message: "Progreso no encontrado." });
        }

        res.json({ message: "Progreso eliminado con éxito.", progreso });
    } catch (error) {
        console.error("Error al eliminar progreso:", error);
        res.status(500).json({ message: "Error al eliminar progreso.", error });
    }
};

// Actualizar progreso existente
export const updateProgreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { ejerciciosCompletados, estado, tiempoTotal, caloriasQuemadas } = req.body;

        const progreso = await Progreso.findByIdAndUpdate(
            id,
            {
                ejerciciosCompletados,
                estado,
                tiempoTotal,
                caloriasQuemadas,
                fechaFin: estado === 'Completado' ? new Date() : null,
            },
            { new: true }
        );

        if (!progreso) {
            return res.status(404).json({ message: "Progreso no encontrado." });
        }

        // Actualizar estadísticas del usuario
        const user = await User.findById(progreso.id?.user);
        if (user) {
            user.ejerciciosCompletados += ejerciciosCompletados || 0;
            user.caloriasQuemadas += caloriasQuemadas || 0;
            user.tiempoEntrenado += tiempoTotal || 0;
            await user.save();
            console.log("Estadísticas del usuario actualizadas.");
        }

        res.json(progreso);
    } catch (error) {
        console.error("Error al actualizar progreso:", error);
        res.status(500).json({ message: "Error al actualizar progreso.", error });
    }
};

// Obtener estadísticas del progreso de un usuario (por mes)
export const getUserStats = async (req, res) => {
    try {
        const { userId } = req.params;
        const stats = await Progreso.aggregate([
            { $match: { user: userId } },
            {
                $group: {
                    _id: { month: { $month: "$fechaInicio" } },
                    totalEjercicios: { $sum: "$ejerciciosCompletados" },
                    totalCalorias: { $sum: "$caloriasQuemadas" },
                    totalTiempo: { $sum: "$tiempoTotal" },
                },
            },
        ]);
        res.status(200).json(stats);
    } catch (error) {
        console.error("Error al obtener estadísticas del usuario:", error);
        res.status(500).json({ message: "Error al obtener estadísticas.", error });
    }
};

// Obtener estadísticas del progreso por período (mensual, semanal, etc.)
export const getUserStatsByPeriod = async (req, res) => {
    const { userId, period } = req.params;

    const matchStage = { user: userId };
    const groupStage = { _id: {}, total: { $sum: "$ejerciciosCompletados" } };

    // Validar el período
    if (period === 'monthly') groupStage._id.month = { $month: "$fechaInicio" };
    else if (period === 'weekly') groupStage._id.week = { $week: "$fechaInicio" };
    else if (period === 'yearly') groupStage._id.year = { $year: "$fechaInicio" };
    else return res.status(400).json({ message: "Período no válido." });

    try {
        const stats = await Progreso.aggregate([
            { $match: matchStage },
            { $group: groupStage }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error al obtener estadísticas por período:", error);
        res.status(500).json({ message: "Error al obtener estadísticas.", error });
    }
};

// Comparar progreso con los objetivos del usuario
export const compareProgressWithGoals = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado." });

        const progreso = await Progreso.countDocuments({
            user: userId,
            estado: 'Completado',
        });

        const cumplido = progreso >= user.metasEjercicios;
        const message = cumplido
            ? "¡Has alcanzado tus objetivos! 🎉"
            : "Aún no has cumplido tus metas, sigue esforzándote. 💪";

        res.json({ progreso, message });
    } catch (error) {
        console.error("Error al comparar progreso con objetivos:", error);
        res.status(500).json({ message: "Error al comparar progreso con objetivos.", error });
    }
};