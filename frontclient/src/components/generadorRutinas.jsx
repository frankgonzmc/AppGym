// Generar rutinas basadas en los ejercicios predeterminados
export const generarRutinas = (ejercicios) => {
    const niveles = ["Principiante", "Intermedio", "Avanzado"];
    const categorias = ["Piernas", "Abdomen", "Cardio", "Pecho", "Espalda", "Hombros", "Tríceps", "Bíceps", "Core", "Cuerpo Completo", "Pliometría"];

    const rutinas = niveles.map(nivel => {
        return categorias.map(categoria => {
            const ejerciciosPorCategoriaYNivel = ejercicios.filter(ejercicio => ejercicio.nivel === nivel && ejercicio.categoria === categoria);
            return {
                nivel,
                categoria,
                ejercicios: ejerciciosPorCategoriaYNivel
            };
        }).filter(rutina => rutina.ejercicios.length > 0); // Elimina categorías sin ejercicios
    }).flat();

    return rutinas;
};

const rutinasGeneradas = generarRutinas(ejerciciosPredeterminados);
