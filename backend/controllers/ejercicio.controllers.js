import Ejercicios from '../models/ejercicio.model.js'

export const getEjercicios = async (req, res) => {
    try {
        const ejercicios = await Ejercicios.find()
        res.json(ejercicios)
    } catch (error) {
        return res.status(500).json({ message: "Something went worng" })
    }
};

export const createEjercicios = async (req, res) => {
    try {
        const { codigo, nombre, descripcion, nivel, categoria, series, duracion, descanso, repeticiones, estado, date } = req.body
        const newEjercicio = new Ejercicios({
            codigo,
            nombre,
            descripcion,
            nivel,
            categoria,
            series,
            duracion,
            descanso,
            repeticiones,
            estado,
            date,
        });

        const saveEjercicio = await newEjercicio.save()
        res.json(saveEjercicio)
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

export const getEjercicio = async (req, res) => {
    try {
        const ejercicio = await Ejercicios.findById(req.params.id);
        if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })
        res.json(ejercicio)
    } catch (error) {
        console.log(error);
    }
};

export const updateEjercicios = async (req, res) => {
    try {
        const ejercicio = await Ejercicios.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })
        res.json(ejercicio)
    } catch (error) {
        return res.status(404).json({ message: "Ejercicio no encontrado..." });
    }
};

export const deleteEjercicios = async (req, res) => {
    try {
        const ejercicio = await Ejercicios.findByIdAndDelete(req.params.id)
        if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })

        return res.status(204);

    } catch (error) {
        return res.status(404).json({ message: "Ejercicio no encontrado..." });
    }
};