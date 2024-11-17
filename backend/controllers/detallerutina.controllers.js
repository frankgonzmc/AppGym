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
export const actualizarProgresoDetalleRutina = async (req, res) => {
    try {
        const { seriesCompletadas } = req.body;
        const { id } = req.params;

        // Buscar el detalle
        const detalle = await DetallesRutina.findById(id).populate("ejercicio");
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado" });

        // Actualizar el progreso de las series
        detalle.seriesProgreso = detalle.seriesProgreso + seriesCompletadas;

        // Verificar si se completó
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = "Completado";
        } else {
            detalle.estado = "En Progreso";
        }

        await detalle.save();

        // Actualizar la rutina asociada
        await actualizarEstadoRutina(detalle.rutina);

        res.json({ message: "Progreso actualizado", detalle });
    } catch (error) {
        console.error("Error al actualizar el progreso:", error);
        res.status(500).json({ message: "Error al actualizar el progreso" });
    }
};

// Actualizar el Estado de la Rutina
export const actualizarEstadoRutina = async (rutinaId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        const ejerciciosCompletados = detalles.filter(
            (detalle) => detalle.estado === "Completado"
        ).length;

        const estadoRutina =
            ejerciciosCompletados === detalles.length ? "Completada" : "Pendiente";

        await Rutinas.findByIdAndUpdate(
            rutinaId,
            { ejerciciosCompletados, estado: estadoRutina },
            { new: true }
        );
    } catch (error) {
        console.error("Error al actualizar el estado de la rutina:", error);
    }
};