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
    const { rutinaId, ejercicioId, series } = req.body;

    try {
        const detalle = await DetallesRutina.findOne({ rutina: rutinaId, ejercicio: ejercicioId }).populate('ejercicio');

        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado" });
        }

        // Validación adicional para evitar errores si no se encuentran series en el ejercicio
        if (!detalle.ejercicio || !detalle.ejercicio.series) {
            return res.status(400).json({ message: "El ejercicio no tiene series definidas." });
        }

        // Asegurar que las series ingresadas sean un número válido
        const seriesProgresadas = parseInt(series, 10);
        if (isNaN(seriesProgresadas) || seriesProgresadas <= 0) {
            return res.status(400).json({ message: "Número de series inválido." });
        }

        // Actualiza el progreso de series y repeticiones
        detalle.seriesProgreso += seriesProgresadas;
        detalle.ejerciciosCompletados += seriesProgresadas > 0 ? 1 : 0; // Incrementa los ejercicios completados solo si hay series progresadas

        // Establecer el estado según el progreso
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = 'Completado';
        } else if (detalle.seriesProgreso > 0) {
            detalle.estado = 'En Progreso';
        } else {
            detalle.estado = 'Pendiente';
        }

        await detalle.save();

        res.status(200).json(detalle);
    } catch (error) {
        console.error('Error actualizando el progreso:', error);
        res.status(500).json({ message: "Error actualizando el progreso", error });
    }
};