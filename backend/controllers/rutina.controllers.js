import Rutinas from '../models/rutina.model.js'
import DetallesRutina from '../models/detallerutina.model.js'
import Progreso from '../models/progreso.model.js'; // Importa tu modelo Progreso
import Historial from '../models/historial.model.js';

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
/*
export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, date, detalles, progreso, historial } = req.body;

        // Validar campos requeridos
        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Los campos nombre y descripción son requeridos." });
        }

        // Crear la nueva rutina
        const newRutina = new Rutinas({
            user: req.user.id,
            nombre,
            descripcion,
            date: new Date(), // Usa la fecha actual si no se proporciona
        });
        const saveRutina = await newRutina.save();
        console.log("Rutina guardada:", saveRutina);

        // Crear los detalles de la rutina asociados
        if (detalles && detalles.length > 0) {
            try {
                for (const detalle of detalles) {
                    const { rutina, ejercicio, duracion } = detalle;

                    console.log("Guardando detalle:", detalle);

                    const newDetalleRutina = new DetallesRutina({
                        rutina,
                        ejercicio,
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
            try {
                const { user, rutina, ejercicio, fecha, estado } = progreso;

                const newProgreso = new Progreso({
                    user,
                    rutina,
                    ejercicio,
                    fecha,
                    estado
                });

                await newProgreso.save();
                console.log("Progreso guardado:", newProgreso);
            } catch (error) {
                console.log("Error")
            }
        } else {
            console.log("No se proporcionaron progresos para guardar.");
        }

        // Crear el progreso asociado
        if (historial) {
            try {
                const { user, rutina, fecha } = historial;

                const newHistorial = new Historial({
                    user,
                    rutina,
                    fecha
                });

                await newHistorial.save();
                console.log("Historial guardado:", newHistorial);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No se proporcionaron historial para guardar.");
        }

        res.json(saveRutina);
    } catch (error) {
        console.error("Error al crear rutina:", error);
        res.status(500).json({ message: "Error al crear rutina", error });
    }
};
*/

export const createRutinas = async (req, res) => {
    try {
        const { nombre, descripcion, detalles, progreso, historial } = req.body;

        // Validar campos requeridos
        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Los campos nombre y descripción son requeridos." });
        }

        // Crear la nueva rutina
        const newRutina = new Rutinas({
            user: req.user.id,
            nombre,
            descripcion,
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
                console.log("Progreso guardado:", progresoGuardado);
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("No se proporcionaron progresos para guardar.");
        }

        // Crear el historial asociado
        if (historial) {
            try {
                console.log("Datos de historial:", historial); // Verifica lo que recibes
                const newHistorial = new Historial({
                    user: req.user.id,
                    rutina: saveRutina._id,
                    ...historial
                });
                const historialGuardado = await newHistorial.save();
                console.log("Historial guardado:", historialGuardado);
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("No se proporcionaron historial para guardar.");
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
