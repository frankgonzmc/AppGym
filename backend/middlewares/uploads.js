import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirectories = {
    profileImage: (userId) => path.join(__dirname, '../uploads/perfil', userId), // Ruta completa
    imagen: path.join(__dirname, '../uploads/ejercicios')  // Ruta completa
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userId = req.user ? req.user.id : null;
        if (!userId) {
            return cb(new Error('No se encontró el ID del usuario'));
        }

        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname](userId) : null;

        if (dir) {
            console.log(`Intentando crear el directorio: ${dir}`);
            try {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
            } catch (error) {
                console.error('Error al crear el directorio:', error);
                return cb(new Error('Error al crear el directorio'));
            }
            cb(null, dir);
        } else {
            cb(new Error('Campo de archivo no soportado'), false);
        }
    },
    filename: function (req, file, cb) {
        const uniqueFilename = `${req.user.id}.jpg`; // Mantén el nombre único por ID
        console.log(`Guardando archivo como: ${uniqueFilename}`);
        cb(null, uniqueFilename);
    }
});

// Filtro de archivo
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes en formato JPG, JPEG, PNG y WEBP'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
