export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); // Valida el esquema con zod
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.errors.map((err) => err.message), // Devuelve los mensajes de error
        });
    }
};


/*export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next(); // Si los datos son válidos, pasa al siguiente middleware/controlador
    } catch (error) {
        // Captura errores y envía un mensaje legible
        const errors = error.errors.map((err) => err.message);
        return res.status(400).json({ message: errors });
    }
};
*/