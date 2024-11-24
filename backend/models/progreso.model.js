const progresoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rutina: { type: mongoose.Schema.Types.ObjectId, ref: 'Rutina', required: true },
    ejerciciosCompletados: { type: Number, default: 0 },
    fechaInicio: { type: Date, default: Date.now },
    fechaFin: { type: Date },
    estado: { type: String, enum: ['Pendiente', 'En Progreso', 'Completado', 'Cancelado'], default: 'Pendiente' },
    tiempoTotal: { type: Number, default: 0 }, // En segundos
    caloriasQuemadas: { type: Number, default: 0 },
    notas: { type: String },
}, { timestamps: true });

export default mongoose.model("Progreso", progresoSchema);
