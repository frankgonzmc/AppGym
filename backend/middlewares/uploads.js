import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Mapa de campos de archivos a sus respectivos directorios
const uploadDirectories = {
    profileImage: (userId) => `./uploads/perfil/${userId}.jpg`,
    imagen: './uploads/ejercicios'
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user ? req.user.id : null; // Verifica si req.user está definido
        if (!userId) {
            return cb(new Error('No se encontró el ID del usuario'));
        }

        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname](userId) : null;

        if (dir) {
            const directoryPath = path.dirname(dir);
            console.log(`Intentando crear el directorio: ${directoryPath}`);
            try {
                if (!fs.existsSync(directoryPath)) {
                    fs.mkdirSync(directoryPath, { recursive: true });
                }
            } catch (error) {
                console.error('Error al crear el directorio:', error);
                return cb(new Error('Error al crear el directorio'));
            }
            cb(null, directoryPath);
        } else {
            cb(new Error('Campo de archivo no soportado'), false);
        }
    },
    filename: function (req, file, cb) {
        const userId = req.user.id;
        const uniqueFilename = `${userId}.jpg`;
        console.log(`Guardando archivo como: ${uniqueFilename}`);
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
