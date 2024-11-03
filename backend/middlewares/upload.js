import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Mapa de campos de archivos a sus respectivos directorios
const uploadDirectories = {
    profileImage: (userId) => `./uploads/perfil/${userId}`,
    imagen: './uploads/ejercicios'
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user.id; // Asegúrate de que estás obteniendo el ID del usuario autenticado
        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname](userId) : null;

        if (dir) {
            console.log(`Intentando crear el directorio: ${dir}`);

            // Crea el directorio si no existe
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error al crear el directorio:', err);
                    return cb(new Error('Error al crear el directorio de destino'));
                }
                cb(null, dir);
            });
        } else {
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
