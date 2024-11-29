export const generadorRutinas = (ejercicios) => {
    const categorias = [
        "Piernas",
        "Abdomen",
        "Brazos",
        "Cardio",
        "Pecho",
        "Espalda",
        "Hombros",
        "Tríceps",
        "Bíceps",
        "Core",
        "Cuerpo Completo",
        "Pliometría",
    ];

    const niveles = ["Principiante", "Intermedio", "Avanzado"];

    const rutinas = [];

    niveles.forEach((nivel) => {
        categorias.forEach((categoria) => {
            const ejerciciosFiltrados = ejercicios.filter(
                (ej) => ej.nivel === nivel && ej.categoria === categoria
            );

            // Agrupar ejercicios en rutinas de 5
            for (let i = 0; i < ejerciciosFiltrados.length; i += 5) {
                rutinas.push({
                    categoria,
                    nivel,
                    ejercicios: ejerciciosFiltrados.slice(i, i + 5),
                });
            }
        });
    });

    return rutinas;
};