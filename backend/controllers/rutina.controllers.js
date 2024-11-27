import Rutinas from '../models/rutina.model.js';
import DetallesRutina from '../models/detallerutina.model.js';
import Progreso from '../models/progreso.model.js';
import User from '../models/user.model.js'; // Importar modelo de usuario

// Obtener todas las rutinas del usuario autenticado o predeterminadas
export const getRutinas = async (req, res) => {
    try {
        const rutinas = await Rutinas.find({ user: req.user.id }).populate('user');
        if (!rutinas || rutinas.length === 0) {
            return res.status(404).json({ message: "No se encontraron rutinas." });
        }
        res.json(rutinas);
    } catch (error) {
        console.error("Error al obtener rutinas:", error);
        res.status(500).json({ message: "Error al obtener rutinas." });
    }
};

// Crear una nueva rutina
export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, detalles = [] } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Los campos nombre, descripción y ejercicios son obligatorios." });
        }

        const newRutina = new Rutinas({
            user: req.user.id,
            nombre,
            descripcion,
            totalEjercicios: detalles.length, // Número total de detalles enviados
            date: new Date(),
        });

        const savedRutina = await newRutina.save();

        // Crear detalles asociados a la rutina
        if (detalles.length > 0) {
            const detallesToSave = detalles.map((detalle) => ({
                ...detalle,
                rutina: savedRutina._id, // Asegura que el detalle apunte a la nueva rutina
            }));
            await DetallesRutina.insertMany(detallesToSave);
        }

        // Crear progreso asociado
        const progreso = new Progreso({
            user: req.user.id,
            rutina: savedRutina._id,
            estado: 'Pendiente',
            ejerciciosCompletados: 0,
            tiempoTotal: 0,
            caloriasQuemadas: 0,
        });
        await progreso.save();

        res.status(201).json(savedRutina);
    } catch (error) {
        console.error('Error al crear rutina:', error);
        res.status(500).json({ message: 'Error al crear rutina.', error });
    }
};

// Obtener una rutina por su ID
export const getRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findById(req.params.id).populate('user');
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada." });

        const detalles = await DetallesRutina.find({ rutina: req.params.id }).populate('ejercicio');
        res.json({ rutina, detalles });
    } catch (error) {
        console.error("Error al obtener rutina:", error);
        res.status(500).json({ message: "Error al obtener rutina.", error });
    }
};

// Actualizar una rutina existente
export const updateRutina = async (req, res) => {
    try {
        const rutinaId = req.params.id;
        const { nombre, descripcion, ejercicios, totalEjercicios, ejerciciosCompletados, estado } = req.body;

        const updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (descripcion) updateData.descripcion = descripcion;
        if (totalEjercicios !== undefined) updateData.totalEjercicios = totalEjercicios;
        if (ejerciciosCompletados !== undefined) updateData.ejerciciosCompletados = ejerciciosCompletados;
        if (estado) updateData.estado = estado;

        const rutina = await Rutinas.findByIdAndUpdate(rutinaId, updateData, { new: true });
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada." });

        // Manejar detalles de rutina
        if (ejercicios) {
            await DetallesRutina.deleteMany({ rutina: rutinaId });

            // Crear nuevos detalles
            const nuevosDetalles = ejercicios.map((ejercicioId) => ({
                rutina: rutinaId,
                ejercicio: ejercicioId,
                fecha: new Date(),
                estado: "Pendiente", // Asegúrate de inicializar correctamente el estado
                seriesProgreso: 0,
            }));
            await DetallesRutina.insertMany(nuevosDetalles);
        }

        res.json(rutina);
    } catch (error) {
        console.error("Error al actualizar rutina:", error);
        res.status(500).json({ message: "Error al actualizar rutina.", error });
    }
};

// Eliminar una rutina
export const deleteRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findByIdAndDelete(req.params.id);
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada." });

        // Eliminar detalles y progreso asociados
        await DetallesRutina.deleteMany({ rutina: req.params.id });
        await Progreso.deleteMany({ rutina: req.params.id });

        res.json({ message: "Rutina, detalles y progreso asociados eliminados.", rutina });
    } catch (error) {
        console.error("Error al eliminar rutina:", error);
        res.status(500).json({ message: "Error al eliminar rutina.", error });
    }
};


export const updateProgresoRutina = async (req, res) => {
    const { rutinaId } = req.params;

    try {
        // Obtén los detalles de la rutina
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        // Calcula ejercicios completados
        const ejerciciosCompletados = detalles.filter(
            (detalle) => detalle.seriesProgreso >= detalle.series
        ).length;

        // Actualiza la rutina
        const rutina = await Rutinas.findByIdAndUpdate(
            rutinaId,
            { ejerciciosCompletados },
            { new: true }
        );

        if (!rutina) {
            return res.status(404).json({ message: "Rutina no encontrada" });
        }

        res.json(rutina);
    } catch (error) {
        console.error("Error al actualizar progreso de rutina:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

// Actualizar progreso de la rutina basado en los ejercicios completados (actualiza todos los detalles)
export const actualizarProgresoRutina = async (rutinaId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        // Calcular ejercicios completados
        const completados = detalles.filter((detalle) => detalle.estado === "Completado").length;

        // Determinar estado general de la rutina
        const estadoRutina = completados === detalles.length ? "Completado" : "En Progreso";

        // Actualizar la rutina
        await Rutinas.findByIdAndUpdate(
            rutinaId,
            { ejerciciosCompletados: completados, estado: estadoRutina },
            { new: true }
        );

        console.log(`Progreso actualizado para rutina ${rutinaId}: ${completados}/${detalles.length}`);
    } catch (error) {
        console.error("Error al actualizar progreso de rutina:", error);
    }
};


export const registrarRutinaCompletado = async (req, res) => {
    console.log("ID recibido:", req.params.id);
    const { id } = req.params; // Asegúrate de extraer correctamente el ID

    try {
        const rutina = await Rutinas.findById(id);
        if (!rutina) {
            return res.status(404).json({ message: "Rutina no encontrada." });
        }

        // Actualizar estado de la rutina
        rutina.estadoRutinaRealizado = 1;
        await rutina.save();

        res.status(200).json({ message: "Rutina marcada como completada.", rutina });
    } catch (error) {
        console.error("Error al registrar rutina como completada:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

// Obtener rutinas incompletas
export const getIncompleteRoutines = async (req, res) => {
    const { id } = req.params; // Asegúrate de extraer correctamente el ID
    try {
        const userId = req.user?._id;
        const rutina = await Rutinas.findById(id);

        if (!userId) {
            return res.status(400).json({ message: "ID de usuario no proporcionado o inválido." });
        }

        const incompleteRoutines = await Rutinas.find({
            user: userId,
            rutina: rutina,
            estado: { $in: ["Pendiente", "En Progreso"] },
        });

        res.status(200).json({ rutinas: incompleteRoutines });
    } catch (error) {
        console.error("Error al obtener rutinas incompletas:", error);
        res.status(500).json({ message: "Error interno al obtener rutinas incompletas." });
    }
};
