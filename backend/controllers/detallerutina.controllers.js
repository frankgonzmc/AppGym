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

        const nuevoDetalleRutina = new DetallesRutina({
            rutina,
            ejercicio,
            fecha,
        });

        const detalleGuardado = await nuevoDetalleRutina.save();
        res.status(201).json(detalleGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el detalle de la rutina", error });
    }
};

// Actualizar un detalle de rutina existente
export const updateDetalleRutina = async (req, res) => {
    try {
        const detalle = await DetallesRutina.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado..." });

        res.json(detalle);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar detalle de rutina", error });
    }
};

// Eliminar un detalle de rutina existente
export const deleteDetalleRutina = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetallesRutina.findByIdAndDelete(id);
        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }
        return res.status(204).send(); // Eliminar con éxito
    } catch (error) {
        console.error("Error al eliminar el detalle:", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

// Actualizar el progreso del detalle de rutina existente
export const actualizarProgresoDetalleRutina = async (req, res) => {
    const { rutinaId, ejercicioId, seriesCompletadas, ejerciciosCompletados } = req.body;

    try {
        const detalle = await DetallesRutina.findOne({ rutina: rutinaId, ejercicio: ejercicioId }).populate('ejercicio');

        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }

        detalle.seriesProgreso += seriesCompletadas;
        detalle.ejerciciosCompletados += ejerciciosCompletados > 0 ? 1 : 0;

        // Actualiza el estado
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = 'Completado';
        } else {
            detalle.estado = 'En Progreso';
        }

        await detalle.save();
        // Actualizar rutina
        await actualizandoEstadosDetallesRutinas(rutinaId); // Llama a la nueva función para actualizar la rutina

        res.status(200).json(detalle);
    } catch (error) {
        console.error('Error actualizando el progreso:', error);
        res.status(500).json({ message: "Error actualizando el progreso", error });
    }
};

// Nueva función para actualizar la rutina
export const actualizandoEstadosDetallesRutinas = async (rutinaId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });
        const ejerciciosCompletos = detalles.filter(detalle => detalle.estado === 'Completado').length;

        await Rutinas.findByIdAndUpdate(rutinaId, { ejerciciosCompletos }, { new: true });
    } catch (error) {
        console.error("Error actualizando la rutina:", error);
        throw error;
    }
};
