import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectories = {
    profileImage: () => path.join(__dirname, '../uploads/perfil'),
    imagen: path.join(__dirname, '../uploads/ejercicios')
};

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = uploadDirectories[file.fieldname] ? uploadDirectories[file.fieldname]() : null;

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
        const uniqueFilename = `${req.user.id}.jpg`;
        console.log(`Guardando archivo como: ${uniqueFilename}`);
        cb(null, uniqueFilename);
    }
});

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
