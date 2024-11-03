import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapa de campos de archivos a sus respectivos directorios
const uploadDirectories = {
    profileImage: (userId) => path.join(__dirname, 'uploads', 'perfil', userId),
    imagen: path.join(__dirname, 'uploads', 'ejercicios')
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user.id; // Asegúrate de que estás obteniendo el ID del usuario autenticado
        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname](userId) : null;

        if (dir) {
            console.log(`Intentando crear el directorio: ${dir}`);
            // Asegúrate de que el directorio se crea
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error al crear el directorio:', err.message);
                    return cb(new Error('Error al crear el directorio de destino'));
                }
                console.log(`Directorio creado: ${dir}`); // Confirmación de creación
                cb(null, dir);
            });
        } else {
            console.error('Campo de archivo no soportado:', file.fieldname);
            cb(new Error('Campo de archivo no soportado'), false);
        }

    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const userId = req.user.id;

        // Genera un nombre único para el archivo
        const uniqueFilename = file.fieldname === 'profileImage'
            ? `profile_${userId}_${timestamp}${extension}`
            : `${timestamp}${extension}`;

        cb(null, uniqueFilename);
    }
});

// Filtro para asegurar que solo se suban imágenes con extensiones permitidas
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato JPG, JPEG, PNG y WEBP'), false);
    }
};

// Crear instancia de multer con almacenamiento y filtro
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
