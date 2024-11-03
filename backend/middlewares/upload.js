import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            let dir;

            // Comprueba el tipo de imagen para determinar el directorio
            if (file.fieldname === 'profileImage') {
                // Imágenes de perfil
                const userId = req.user ? req.user.id : 'default';
                dir = `./uploads/perfil/${userId}`;
            } else if (file.fieldname === 'imagen') {
                // Imágenes de ejercicios
                dir = './uploads/ejercicios';
            }

            // Crea el directorio si no existe
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        } catch (error) {
            cb(new Error('Error al crear el directorio de destino'), null);
        }
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);
        const userId = req.user ? req.user.id : 'unknown';

        // Genera un nombre único para el archivo, incluyendo el ID del usuario si está disponible
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
