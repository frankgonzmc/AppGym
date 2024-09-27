import Rutinas from '../models/rutina.model.js'
import Ejercicio from '../models/ejercicio.model.js'
import DetallesRutina from '../models/detallerutina.model.js'
import Progreso from '../models/progreso.model.js'; // Importa tu modelo Progreso

// Obtener todas las rutinas del usuario autenticado
export const getRutinas = async (req, res) => {
    try {
        const rutinas = await Rutinas.find({
            user: req.user.id
        }).populate('user');
        res.json(rutinas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener rutinas", error });
    }
};

// Crear una nueva rutina y asociar detalles de rutina y progreso
export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, nivel, detalles } = req.body;

        // Guarda la rutina primero
        const rutina = new Rutinas({
            nombre,
            descripcion,
            nivel,
            user: req.userId,
        });
        await rutina.save();

        // Guarda los detalles
        for (const detalle of detalles) {
            // Busca el ObjectId del ejercicio por su nombre
            const ejercicio = await Ejercicio.findOne({ nombre: detalle.ejercicio });
            if (!ejercicio) {
                return res.status(400).json({ message: `Ejercicio ${detalle.ejercicio} no encontrado` });
            }

            const detalleRutina = new DetallesRutina({
                ejercicio: ejercicio._id, // Guardar el ObjectId en lugar del nombre
                orden: detalle.orden,
                series: detalle.series,
                repeticiones: detalle.repeticiones,
                duracion: detalle.duracion,
                rutina: rutina._id,
            });
            await detalleRutina.save();
        }

        res.status(201).json({ message: "Rutina creada con éxito" });
    } catch (error) {
        console.error("Error al guardar los detalles de la rutina:", error);
        res.status(500).json({ message: "Error al crear la rutina", error });
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
        res.status(500).json({ message: "Error al obtener rutina", error });
    }
};

// Actualizar una rutina existente
export const updateRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        res.json(rutina);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar rutina", error });
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
