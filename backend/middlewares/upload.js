import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
    }
});

// Filtro para asegurarse de que solo se suban imágenes GIF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Only GIF images are allowed'), false);
    }
};

// Crear instancia de multer con almacenamiento y filtro
export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});
