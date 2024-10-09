import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Crear carpeta uploads/perfil si no existe
const dir = './uploads/perfil';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Crea la carpeta recursivamente
}

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, dir); // Carpeta donde se guardarán las imágenes de perfil
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
    }
});

// Filtro para asegurarse de que solo se suban imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'), false);
    }
};

// Crear instancia de multer con almacenamiento y filtro
export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
