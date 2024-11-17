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

// Actualizar progreso y estado de un detalle de rutina
export const actualizarProgresoDetalleRutina = async (req, res) => {
    const { detalleId } = req.params;
    const { seriesProgreso } = req.body;

    try {
        // Buscar el detalle de rutina por su ID
        const detalle = await DetallesRutina.findById(detalleId).populate('ejercicio');
        if (!detalle) {
            return res.status(404).json({ message: "Detalle de rutina no encontrado" });
        }

        // Actualizar series completadas
        detalle.seriesProgreso = seriesProgreso;

        // Determinar el estado del detalle
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = 'Completado';
        } else {
            detalle.estado = 'En Progreso';
        }

        await detalle.save();

        // Actualizar el estado de la rutina general
        await actualizandoEstadosDetallesRutinas(detalle.rutina);

        res.status(200).json(detalle);
    } catch (error) {
        console.error("Error al actualizar el progreso del detalle:", error);
        res.status(500).json({ message: "Error al actualizar el progreso del detalle", error });
    }
};

// Función para actualizar el progreso general de una rutina
export const actualizandoEstadosDetallesRutinas = async (rutinaId) => {
    try {
        // Obtener todos los detalles asociados a la rutina
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        // Contar cuántos ejercicios están completados
        const ejerciciosCompletados = detalles.filter(detalle => detalle.estado === 'Completado').length;

        // Determinar el estado de la rutina
        const estadoRutina = ejerciciosCompletados === detalles.length ? 'Completado' : 'Pendiente';

        // Actualizar la rutina con el progreso y estado
        await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados,
            estado: estadoRutina,
        });

        console.log(`Estado actualizado para rutina ${rutinaId}: ${ejerciciosCompletados}/${detalles.length}`);
    } catch (error) {
        console.error("Error al actualizar el estado de la rutina:", error);
        throw error;
    }
};