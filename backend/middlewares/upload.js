import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determina el destino según el tipo de imagen
        const userId = req.user ? req.user.id : null; // Para imágenes de perfil
        let dir;

        if (file.fieldname === 'profileImage') {
            // Imágenes de perfil
            dir = `./uploads/perfil/${userId}`;
        } else if (file.fieldname === 'imagen') {
            // Imágenes de ejercicios
            dir = './uploads/ejercicios';
        }

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true }); // Crea la carpeta recursivamente
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo con la fecha actual
    }
});

// Filtro para asegurarse de que solo se suban imágenes con las extensiones permitidas
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
