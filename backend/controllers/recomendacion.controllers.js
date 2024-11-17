import Ejercicio from '../models/ejercicio.model.js';
import User from '../models/user.model.js';

export const getRecomendaciones = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const ejerciciosSugeridos = await Ejercicio.find({ nivel: user.nivel });

        const recomendaciones = ejerciciosSugeridos.map(ejercicio => ({
            ejercicio,
            motivo: `Basado en tu nivel ${user.nivel} y progreso reciente`
        }));

        res.json(recomendaciones);
    } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
        res.status(500).json({ message: "Error al generar recomendaciones" });
    }
};
