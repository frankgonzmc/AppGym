import Rutinas from '../models/rutina.model.js'
import DetallesRutina from '../models/detallerutina.model.js'
import Progreso from '../models/progreso.model.js'; // Importa tu modelo Progreso
import mongoose from 'mongoose';

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
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { nombre, descripcion, nivel, date, detalles, progreso } = req.body;

        // Crear la nueva rutina
        const newRutina = new Rutinas({
            nombre,
            descripcion,
            nivel,
            date,
            user: req.user.id
        });

        const saveRutina = await newRutina.save({ session });

        // Crear los detalles de la rutina asociados
        if (detalles && detalles.length > 0) {
            for (const detalle of detalles) {
                const { ejercicio, orden, series, repeticiones, duracion } = detalle;

                const newDetalleRutina = new DetallesRutina({
                    rutina: saveRutina._id,
                    ejercicio,
                    orden,
                    series,
                    repeticiones,
                    duracion
                });

                await newDetalleRutina.save({ session });
            }
        }

        // Crear el progreso asociado
        if (progreso) {
            const { user, fecha, notas, estado } = progreso;

            const newProgreso = new Progreso({
                user,
                rutina: saveRutina._id,
                fecha,
                notas,
                estado
            });

            await newProgreso.save({ session });
        }

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        res.json(saveRutina);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Error al crear rutina", error });
    }
};

// Obtener una rutina por su ID
export const getRutina = async (req, res) => {
    try {
        const rutina = await Rutinas.findById(req.params.id).populate('user');
        if (!rutina) return res.status(404).json({ message: "Rutina no encontrada..." });

        const detalles = await DetalleRutina.find({ rutina: req.params.id }).populate('ejercicio');
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
        await DetallesRutina.deleteMany({ rutina: req.params.id });

        // Eliminar los progresos asociados a la rutina
        await Progreso.deleteMany({ rutina: req.params.id });

        res.json({ message: "Rutina, detalles y progreso asociados eliminados con éxito", rutina });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar rutina", error });
    }
};
