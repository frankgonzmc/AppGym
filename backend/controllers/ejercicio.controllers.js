import Ejercicios from '../models/ejercicio.model.js';
import multer from 'multer';
import path from 'path';

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

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para evitar colisiones
    }
});

// Configuración de multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limitar el tamaño de archivos a 5 MB
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/; // Solo permite imágenes
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de imagen (jpeg, jpg, png, gif)'));
        }
    }
});