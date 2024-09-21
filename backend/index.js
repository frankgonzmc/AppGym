import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

async function main() {
    try {
        await connectDB();
        app.listen(PORT);
        console.log(`Conectado en el puerto: ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`)
    } catch (error) {
        console.error(error);
    }
}

main();