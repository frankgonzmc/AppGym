import DetallesRutina from '../models/detallerutina.model.js';
import Rutinas from '../models/rutina.model.js';
import Ejercicios from '../models/ejercicio.model.js';
import { calcularCaloriasQuemadas } from '../utils/calorias.js';

// Obtener detalles de rutina por ID de rutina
export const getDetallesRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findById(req.params.id).populate('user');
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada." });

        const detalles = await DetallesRutina.find({ rutina: req.params.id }).populate('ejercicio');
        res.json({ rutina, detalles });
    } catch (error) {
        console.error("Error al obtener detalles de rutina:", error);
        res.status(500).json({ message: "Error al obtener detalles de rutina.", error });
    }
};

// Crear un nuevo detalle de rutina
export const createDetalleRutina = async (req, res) => {
    try {
        const { rutina, ejercicio, fecha } = req.body;

        const rutinaExistente = await Rutinas.findById(rutina);
        if (!rutinaExistente) return res.status(404).json({ message: "Rutina no encontrada." });

        const nuevoDetalleRutina = new DetallesRutina({
            rutina,
            ejercicio,
            fecha,
        });

        const detalleGuardado = await nuevoDetalleRutina.save();

        // Incrementar el total de ejercicios en la rutina
        rutinaExistente.totalEjercicios += 1;
        await rutinaExistente.save();

        res.status(201).json(detalleGuardado);
    } catch (error) {
        console.error("Error al crear el detalle de rutina:", error);
        res.status(500).json({ message: "Error al crear el detalle de rutina.", error });
    }
};


// Actualizar un detalle de rutina existente
export const updateDetalleRutina = async (req, res) => {
    try {
        const { id } = req.params;
        const { seriesProgreso, estado, estadoEjercicioRealizado, caloriasQuemadas, tiempoEstimado } = req.body;

        const detalle = await DetallesRutina.findByIdAndUpdate(
            id,
            { seriesProgreso, estado, estadoEjercicioRealizado, caloriasQuemadas, tiempoEstimado },
            { new: true }
        );

        if (!detalle) {
            return res.status(404).json({ message: "Detalle de rutina no encontrado." });
        }

        // Actualiza los campos permitidos
        if (seriesProgreso !== undefined) detalle.seriesProgreso = seriesProgreso;
        if (estado) detalle.estado = estado;

        // Actualizar estadoEjercicioRealizado si el ejercicio se completa
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = "Completado";
        }

        if (estadoEjercicioRealizado !== undefined) detalle.estadoEjercicioRealizado = estadoEjercicioRealizado;

        await detalle.save();

        // Actualizar progreso general de la rutina
        //await actualizandoEstadosDetallesRutinas(detalle.rutina);

        res.json(detalle);
    } catch (error) {
        console.error("Error al actualizar detalle de rutina:", error);
        res.status(500).json({ message: "Error al actualizar detalle de rutina.", error });
    }
};

/*
export const updateDetalleRutina = async (req, res) => {
    try {
        const { id } = req.params; // Corregir aquí: no es req.params.id, sino req.params
        const { seriesProgreso, estado } = req.body;

        const detalle = await DetallesRutina.findById(id);
        if (!detalle) return res.status(404).json({ message: "Detalle no encontrado." });

        // Actualiza los campos permitidos
        if (seriesProgreso !== undefined) detalle.seriesProgreso = seriesProgreso;
        if (estado) detalle.estado = estado;

        // Actualizar estadoEjercicioRealizado si el ejercicio se completa
        if (detalle.seriesProgreso >= detalle.ejercicio.series) {
            detalle.estado = "Completado";
        }

        detalle.ejercicio.estadoEjercicioRealizado = detalle.estado >= detalle.seriesProgreso ? 1 : 0;

        await detalle.save();

        // Actualizar progreso general de la rutina
        await actualizandoEstadosDetallesRutinas(detalle.rutina);

        res.json(detalle);
    } catch (error) {
        console.error("Error al actualizar detalle de rutina:", error);
        res.status(500).json({ message: "Error al actualizar detalle de rutina.", error });
    }
};*/

// Eliminar un detalle de rutina
export const deleteDetalleRutina = async (req, res) => {
    try {
        console.log("ID recibido para eliminar:", req.params.id);
        const detalle = await DetallesRutina.findByIdAndDelete(req.params.id);

        if (!detalle) {
            return res.status(404).json({ message: "Detalle no encontrado." });
        }

        // Actualizar el total de ejercicios en la rutina
        const rutina = await Rutinas.findById(detalle.rutina);
        if (rutina) {
            rutina.totalEjercicios -= 1;
            await rutina.save();
        }

        res.status(204).send(); // Eliminación exitosa
    } catch (error) {
        console.error("Error al eliminar detalle de rutina:", error);
        res.status(500).json({ message: "Error al eliminar detalle de rutina.", error });
    }
};

// Actualizar progreso y estado de un detalle de rutina
export const actualizarProgresoDetalleRutina = async (req, res) => {
    try {
        const { id } = req.params; // `id` en lugar de `detalleId`
        const { seriesProgreso } = req.body;

        const detalle = await DetallesRutina.findById(id).populate("ejercicio");
        if (!detalle) return res.status(404).json({ message: "Detalle de rutina no encontrado." });

        detalle.seriesProgreso = seriesProgreso;
        //const valorestado = detalle.ejercicio.estadoEjercicioRealizado = 1;

        // Calcular tiempo total y calorías quemadas
        const tiempoTotal = detalle.ejercicio.duracion * seriesProgreso; // En segundos
        const caloriasQuemadas = calcularCaloriasQuemadas(detalle.pesoUsuario || 70, tiempoTotal);
        detalle.caloriasQuemadas = caloriasQuemadas;

        /*
        // Actualizar estado del detalle
        detalle.estado = seriesProgreso >= detalle.ejercicio.series ? "Completado" : "En Progreso";
        detalle.estadoEjercicioRealizado = valorestado;
        detalle.caloriasQuemadas = caloriasQuemadas;
        detalle.tiempoEstimado = tiempoTotal;
*/

        await detalle.save();

        // Actualizar progreso general de la rutina
        await actualizandoEstadosDetallesRutinas(detalle.rutina);

        res.status(200).json(detalle);
    } catch (error) {
        console.error("Error al actualizar progreso del detalle:", error);
        res.status(500).json({ message: "Error al actualizar progreso del detalle.", error });
    }
};


// Actualizar el progreso general de la rutina
export const actualizandoEstadosDetallesRutinas = async (rutinaId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        // Contar ejercicios completados
        const ejerciciosCompletados = detalles.filter(detalle => detalle.estado === 'Completado').length;

        // Determinar el estado general de la rutina
        const estadoRutina = ejerciciosCompletados === detalles.length ? 'Completado' : 'En Progreso';

        // Actualizar rutina
        const rutinas = await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados,
            estado: estadoRutina,
        });

        console.log(`Estado actualizado para la rutina ${rutinaId}: ${ejerciciosCompletados}/${detalles.length}`);
        res.status(200).json(rutinas);
    } catch (error) {
        console.error("Error al actualizar el progreso de la rutina:", error);
        throw error;
    }
};
