import Rutinas from '../models/rutina.model.js';
import DetallesRutina from '../models/detallerutina.model.js';
import Progreso from '../models/progreso.model.js';
import User from '../models/user.model.js'; // Importar modelo de usuario

// Obtener todas las rutinas del usuario autenticado o predeterminadas
export const getRutinas = async (req, res) => {
    try {
        // Filtrar rutinas asociadas al usuario autenticado
        const rutinas = await Rutinas.find({ user: req.user._id });
        if (!rutinas || rutinas.length === 0) {
            return res.status(404).json({ message: "No se encontraron rutinas." });
        }
        res.json(rutinas);
    } catch (error) {
        console.error("Error al obtener rutinas:", error.message);
        res.status(500).json({ message: "Error al obtener rutinas", error: error.message });
    }
};

// Crear una nueva rutina
export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, detalles = [], progreso } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Los campos nombre y descripción son obligatorios." });
        }

        const newRutina = new Rutinas({
            user: req.user.id,
            nombre,
            descripcion,
            totalEjercicios: detalles.length || 0,
            date: new Date(),
        });

        const savedRutina = await newRutina.save();
        console.log("Rutina guardada:", savedRutina);

        // Crear detalles de la rutina
        if (detalles.length > 0) {
            const detallesToSave = detalles.map(detalle => ({
                ...detalle,
                rutina: savedRutina._id
            }));

            await DetallesRutina.insertMany(detallesToSave);
            console.log("Detalles guardados.");
        }

        // Crear progreso asociado
        if (progreso) {
            const newProgreso = new Progreso({
                user: req.user.id,
                rutina: savedRutina._id,
                ...progreso
            });
            await newProgreso.save();
            console.log("Progreso asociado creado.");
        }

        res.status(201).json(savedRutina);
    } catch (error) {
        console.error("Error al crear rutina:", error);
        res.status(500).json({ message: "Error al crear rutina.", error });
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

            const nuevosDetalles = ejercicios.map(ejercicioId => ({
                rutina: rutinaId,
                ejercicio: ejercicioId,
                fecha: new Date()
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

// Actualizar progreso de la rutina basado en los ejercicios completados
export const actualizarProgresoRutina = async (rutinaId, userId) => {
    try {
        const detalles = await DetallesRutina.find({ rutina: rutinaId });
        const completados = detalles.filter(detalle => detalle.estado === "Completado").length;

        const estadoRutina = completados === detalles.length ? "Completado" : "Pendiente";

        const rutina = await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados: completados,
            estado: estadoRutina,
        }, { new: true });

        if (!rutina) return console.error("Rutina no encontrada para actualizar progreso.");

        const user = await User.findById(userId);
        if (user) {
            user.ejerciciosCompletados += completados;
            await user.save();
            console.log("Estadísticas del usuario actualizadas.");
        }

        console.log(`Progreso actualizado para rutina ${rutinaId}: ${completados}/${detalles.length}`);
    } catch (error) {
        console.error("Error al actualizar progreso de rutina:", error);
    }
};
