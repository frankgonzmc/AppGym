import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import seedEjercicios from "./seeds/ejercicioseeds.js"; // Ruta a tu archivo seed.js

async function main() {
    try {
        await connectDB();
        app.listen(PORT);
        await seedEjercicios();
        console.log(`Conectado en el puerto: ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`)
    } catch (error) {
        console.error(error);
    }
}

main();