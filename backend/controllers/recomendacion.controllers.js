import Ejercicio from '../models/ejercicio.model.js';
import User from '../models/user.model.js';

export const getRecomendaciones = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        const ejerciciosSugeridos = await Ejercicio.find({ nivel: user.nivel });

        const recomendaciones = ejerciciosSugeridos.map(ejercicio => ({
            user: userId,
            ejercicio: ejercicio,
            motivo: `Basado en tu nivel de ${user.nivel} y tu progreso reciente`,
        }));

        res.json(recomendaciones);
    } catch (error) {
        console.error("Error al obtener recomendaciones:", error);
        res.status(500).json({ message: "Error al generar recomendaciones" });
    }
};
