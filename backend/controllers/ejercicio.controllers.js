import Ejercicios from '../models/ejercicio.model.js'

export const getEjercicios = async (req, res) => {
    const ejercicio = await Ejercicios.find()
    res.json(ejercicio)
};

export const createEjercicios = async (req, res) => {
    const { codigo, nombre, descripcion, categoria, duracion, date } = req.body
    const newEjercicio = new Ejercicios({
        codigo,
        nombre,
        descripcion,
        categoria,
        duracion,
        date,
    });

    const saveEjercicio = await newEjercicio.save()
    res.json(saveEjercicio)
};

export const getEjercicio = async (req, res) => {
    const ejercicio = await Ejercicios.findById(req.params.id);
    if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })
    res.json(ejercicio)
};

export const updateEjercicios = async (req, res) => {
    const ejercicio = await Ejercicios.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })
    res.json(ejercicio)
};

export const deleteEjercicios = async (req, res) => {
    const ejercicio = await Ejercicios.findByIdAndDelete(req.params.id)
    if (!ejercicio) return res.status(404).json({ message: "Ejercicio no encontrado..." })

    return res.status(204);

};