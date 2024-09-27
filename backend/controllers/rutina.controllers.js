import Rutinas from '../models/rutina.model.js'
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
        console.log(req.body); // Verifica los datos que recibes

        const { nombre, descripcion, nivel, date, detalles, progreso } = req.body;

        // Crear la nueva rutina
        const newRutina = new Rutinas({
            nombre,
            descripcion,
            nivel,
            date,
            user: req.user.id
        });
        const saveRutina = await newRutina.save();
        console.log("Rutina guardada:", saveRutina);

        // Crear los detalles de la rutina asociados
        if (detalles && detalles.length > 0) {
            try {
                for (const detalle of detalles) {
                    const { ejercicio, orden, series, repeticiones, duracion } = detalle;

                    console.log("Guardando detalle:", detalle);

                    const newDetalleRutina = new DetallesRutina({
                        rutina: saveRutina._id,
                        ejercicio,
                        orden,
                        series,
                        repeticiones,
                        duracion
                    });

                    await newDetalleRutina.save();
                    console.log("Detalle guardado:", newDetalleRutina);
                }
            } catch (error) {
                console.error("Error al guardar los detalles de la rutina:", error);
                return res.status(500).json({ message: "Error al guardar los detalles de la rutina", error });
            }
        } else {
            console.log("No se proporcionaron detalles para guardar.");
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

            await newProgreso.save();
            console.log("Progreso guardado:", newProgreso);
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
