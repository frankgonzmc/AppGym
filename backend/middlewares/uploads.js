import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapa de campos de archivos a sus respectivos directorios
const uploadDirectories = {
    profileImage: () => path.join(__dirname, 'uploads', 'perfil'),
    imagen: () => path.join(__dirname, 'uploads', 'ejercicios'),
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname]() : null;

        if (dir) {
            console.log(`Intentando crear el directorio: ${dir}`);
            // Asegúrate de que el directorio se crea
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error al crear el directorio:', err.message);
                    return cb(new Error('Error al crear el directorio de destino'));
                }
                cb(null, dir); // Usamos la carpeta 'uploads/perfil' como destino
            });
        } else {
            console.error('Campo de archivo no soportado:', file.fieldname);
            cb(new Error('Campo de archivo no soportado'), false);
        }
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const userId = req.user.id;

        // Genera un nombre único para el archivo
        const uniqueFilename = `profile_${userId}_${timestamp}${path.extname(file.originalname)}`;

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
