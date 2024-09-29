import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import seedEjercicios from './seeds/ejercicioseeds.js'; // Ruta a tu archivo seed.js

async function main() {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Conectado en el puerto: ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
        });

        // Ejecutar el seeder solo si está en modo desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log("Ejecutando seeders en entorno de desarrollo...");
            await seedEjercicios();
            console.log("Seeders ejecutados correctamente.");
        }
    } catch (error) {
        console.error("Error al iniciar la aplicación:", error);
    }
}

main();
