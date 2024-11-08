import Rutinas from '../models/rutina.model.js'
import DetallesRutina from '../models/detallerutina.model.js'
import Progreso from '../models/progreso.model.js'; // Importa tu modelo Progreso

// Obtener todas las rutinas del usuario autenticado
export const getRutinas = async (req, res) => {
    try {
        const rutinas = await Rutinas.find({
            user: req.user.id
        }).populate('user');
        if (!rutinas) {
            return res.status(404).json({ message: "Rutina no encontrada para el ID especificado." });
        }
        res.json(rutinas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener rutinas", error });
    }
};

export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, detalles = [], progreso, totalEjercicios } = req.body;

        // Validar campos requeridos
        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Los campos nombre y descripción son requeridos." });
        }

        // Validar si detalles es un array
        if (!Array.isArray(detalles)) {
            return res.status(400).json({ message: "El campo detalles debe ser un array." });
        }

        // Crear la nueva rutina
        const newRutina = new Rutinas({
            user: req.user.id,
            nombre,
            descripcion,
            totalEjercicios, // Aquí asignamos el total de ejercicios
            date: new Date(),
        });
        const saveRutina = await newRutina.save();
        console.log("Rutina guardada:", saveRutina);

        // Crear los detalles de la rutina
        if (detalles && detalles.length > 0) {
            for (const detalle of detalles) {
                const newDetalleRutina = new DetallesRutina(detalle);
                await newDetalleRutina.save();
                console.log("Detalle guardado:", newDetalleRutina);
            }

            // Crear el progreso asociado
            if (progreso) {
                try {
                    console.log("Datos de progreso:", progreso); // Verifica lo que recibes
                    const newProgreso = new Progreso({
                        user: req.user.id,
                        rutina: saveRutina._id,
                        ...progreso
                    });
                    const progresoGuardado = await newProgreso.save();
                    console.log(progresoGuardado);
                } catch (error) {
                    console.log(error)
                }
            }
        }
        res.json(saveRutina);
    } catch (error) {
        console.error("Error al crear rutina:", error);
        res.status(500).json({ message: "Error al crear rutina", error });
    }
};


// Obtener una rutina por su ID
export const getRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findById(req.params.id).populate('user');
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        const detalles = await DetallesRutina.find({ rutina: req.params.id }).populate('ejercicio');
        res.json({ rutina, detalles });
    } catch (error) {
        console.error("Error al obtener rutina:", error);
        res.status(500).json({ message: "Error al obtener rutina", error });
    }
};

// Actualizar una rutina existente
export const updateRutina = async (req, res) => {
    try {
        const rutinaId = req.params.id;
        if (!rutinaId) return res.status(400).json({ message: "ID de rutina es requerido." });

        const { nombre, descripcion, ejercicios, totalEjercicios } = req.body; // obtener totalEjercicios también
        const updateData = {};
        if (nombre) updateData.nombre = nombre;
        if (descripcion) updateData.descripcion = descripcion;
        if (totalEjercicios) updateData.totalEjercicios = totalEjercicios; // Actualizar totalEjercicios

        // Actualiza la rutina
        const rutina = await Rutinas.findByIdAndUpdate(rutinaId, updateData, { new: true });
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        // Aquí maneja los detalles de la rutina (ejercicios)
        await DetallesRutina.deleteMany({ rutina: rutinaId }); // Elimina los detalles existentes
        const detalles = ejercicios.map(ejercicioId => ({
            rutina: rutinaId,
            ejercicio: ejercicioId,
            fecha: new Date(),
        }));
        await DetallesRutina.insertMany(detalles); // Inserta los nuevos detalles

        res.json(rutina);
    } catch (error) {
        console.error("Error al actualizar rutina:", error);
        res.status(500).json({ message: "Error al actualizar rutina", error: error.message });
    }
};

// Eliminar una rutina existente
export const deleteRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findByIdAndDelete(req.params.id);
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        // Eliminar los detalles de rutina asociados
        await DetallesRutina.deleteMany({ id_rutina: req.params.id });

        res.json({ message: "Rutina y detalles asociados eliminados con éxito", rutina });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar rutina", error });
    }
};

// Actualiza el progreso de la rutina basado en los ejercicios completados
export const actualizarProgresoRutina = async (rutinaId) => {
    try {
        // Obtiene todos los detalles de la rutina
        const detalles = await DetallesRutina.find({ rutina: rutinaId });

        // Cuenta los ejercicios completados (ejemplo: si seriesProgreso llega a 4)
        const completados = detalles.filter(detalle => detalle.seriesProgreso === 4).length;

        // Actualiza los campos `ejerciciosCompletados` y `estado` en la rutina
        await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados: completados,
            estado: completados === detalles.length ? "Completado" : "Pendiente"
        });
    } catch (error) {
        console.error("Error al actualizar el progreso de la rutina:", error);
    }
};

export const actualizarEstadoRutina = async (req, res) => {
    const { rutinaId } = req.params;
    const { ejerciciosCompletos } = req.body;

    try {
        // Obtén todos los detalles de la rutina y calcula los ejercicios completados y el estado
        const detalles = await DetallesRutina.find({ rutina: rutinaId });
        const totalEjercicios = detalles.length;
        const estadoRutina = ejerciciosCompletos === totalEjercicios ? 'Completado' : 'Pendiente';

        // Actualiza la rutina en la base de datos
        const rutinaActualizada = await Rutinas.findByIdAndUpdate(rutinaId, {
            ejerciciosCompletados: ejerciciosCompletos,
            estado: estadoRutina
        }, { new: true });

        if (!rutinaActualizada) {
            console.log("Rutina no encontrada");
            return res.status(404).json({ message: "Rutina no encontrada" });
        }

        res.json(rutinaActualizada);
    } catch (error) {
        console.error("Error al actualizar el estado de la rutina:", error);
        res.status(500).json({ message: "Error al actualizar la rutina", error });
    }
};