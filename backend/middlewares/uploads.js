import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Mapa de campos de archivos a sus respectivos directorios
const uploadDirectories = {
    profileImage: (userId) => `./public/uploads/perfil/${userId}`, // Cambiar para solo usar userId
    imagen: './public/uploads/ejercicios'
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
            // Crea el directorio si no existe
            if (!fs.existsSync(directoryPath)) {
                try {
                    fs.mkdirSync(directoryPath, { recursive: true });
                    console.log(`Directorio creado: ${directoryPath}`); // Confirma que el directorio se ha creado
                } catch (err) {
                    console.error('Error al crear el directorio:', err.message);
                    return cb(new Error('Error al crear el directorio de destino'));
                }
            }
            cb(null, directoryPath);
        } else {
            cb(new Error('Campo de archivo no soportado'), false);
        }
    },
    filename: function (req, file, cb) {
        const userId = req.user.id; // Asegúrate de que este valor es correcto
        const uniqueFilename = `${userId}.jpg`; // Nombre del archivo usando solo el userId

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
