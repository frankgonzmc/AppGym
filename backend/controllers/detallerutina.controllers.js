import DetallesRutina from '../models/detallerutina.model.js';
import Rutinas from '../models/rutina.model.js';

// Obtener una rutina por su ID
export const getDetallesRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findById(req.params.id).populate('user');
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        const detalles = await DetallesRutina.find({ rutina: req.params.id }).populate('ejercicio');
        res.json({ rutina, detalles });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener rutina", error });
    }
};

export const createDetalleRutina = async (req, res) => {
    try {
        const { rutina, ejercicio, fecha } = req.body;

        const rutinaExistente = await Rutinas.findById(rutina);
        if (!rutinaExistente) return res.status(404).json({ message: "Rutina no encontrada" });

        const nuevoDetalleRutina = new DetallesRutina({
            rutina,
            ejercicio,
            fecha,
        });

        const detalleGuardado = await nuevoDetalleRutina.save();

        // Actualizar el total de ejercicios en la rutina
        rutinaExistente.totalEjercicios += 1;
        await rutinaExistente.save();

        res.status(201).json(detalleGuardado);
    } catch (error) {
        console.error("Error al crear el detalle de la rutina:", error);
        res.status(500).json({ message: "Error al crear el detalle de la rutina", error });
    }
};

// Actualizar un detalle de rutina existente
export const updateDetalleRutina = async (req, res) => {
    try {
        const { id } = req.params;
        const { seriesProgreso, estado } = req.body;

        const detalle = await DetallesRutina.findById(id);
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        if (seriesProgreso !== undefined) detalle.seriesProgreso = seriesProgreso;
        if (estado) detalle.estado = estado;

        await detalle.save();

        // Actualiza el progreso general de la rutina
        await actualizandoEstadosDetallesRutinas(detalle.rutina);

        res.json(detalle);
    } catch (error) {
        console.error("Error al actualizar detalle de rutina:", error);
        res.status(500).json({ message: "Error al actualizar detalle de rutina", error });
    }
};

// Eliminar un detalle de rutina existente
export const deleteDetalleRutina = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetallesRutina.findByIdAndDelete(id);
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado" });

        // Actualizar el total de ejercicios en la rutina
        const rutina = await Rutinas.findById(detalle.rutina);
        if (rutina) {
            rutina.totalEjercicios -= 1;
            await rutina.save();
        }

        return res.status(204).send(); // Eliminación exitosa
    } catch (error) {
        console.error("Error al eliminar el detalle:", error);
        return res.status(500).json({ message: "Error al eliminar detalle de rutina", error });
    }
};

// Actualizar progreso y estado de rutina
// Controlador de DetallesRutina - detallerutina.controllers.js
export const actualizarProgresoDetalleRutina = async (req, res) => {
    const { rutinaId, ejercicioId, seriesCompletadas } = req.body;
    console.log("Solicitud de actualización recibida:", req.body); // Log para verificar los datos recibidos

    try {
        const detalle = await DetallesRutina.findOne({ rutina: rutinaId, ejercicio: ejercicioId }).populate('ejercicio');
        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }

        detalle.seriesProgreso = seriesCompletadas;
        detalle.estado = detalle.seriesProgreso >= detalle.ejercicio.series ? 'Completado' : 'En Progreso';
        await detalle.save();

        // Actualiza la rutina después de actualizar el detalle
        await actualizandoEstadosDetallesRutinas(rutinaId);

        res.status(200).json(detalle);
    } catch (error) {
        console.error('Error actualizando el progreso:', error);
        res.status(500).json({ message: "Error actualizando el progreso", error });
    }
};


// Función para actualizar el progreso de la rutina - detallerutina.controllers.js o rutina.controllers.js
export const actualizandoEstadosDetallesRutinas = async (rutinaId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });
        const ejerciciosCompletos = detalles.filter(detalle => detalle.estado === 'Completado').length;

        const estadoRutina = ejerciciosCompletos === detalles.length ? 'Completado' : 'Pendiente';

        await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados: ejerciciosCompletos,
            estado: estadoRutina,
        }, { new: true });

        console.log(`Estado de rutina actualizado: ${ejerciciosCompletos}/${detalles.length}`);
    } catch (error) {
        console.error("Error actualizando estado de rutina:", error);
        throw error;
    }
};
