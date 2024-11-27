import mongoose from "mongoose";

const ProgresoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rutina: { type: mongoose.Schema.Types.ObjectId, ref: "Rutinas", required: true },
    ejerciciosCompletados: { type: Number, default: 0 },
    estado: { type: String, enum: ["Pendiente", "En Progreso", "Completado"] }, // Opcional: valores permitidos}, // Enum para valores válidos
    tiempoTotal: { type: Number, default: 0 }, // Tiempo total en segundos
    caloriasQuemadas: { type: Number, default: 0 },
    fechaInicio: { type: Date, default: Date.now },
    fechaFin: { type: Date },
});

export default mongoose.model("Progreso", ProgresoSchema);
