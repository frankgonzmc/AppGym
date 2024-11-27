// utils/calorias.js

/**
 * Calcula las calorías quemadas durante un ejercicio.
 * @param {number} pesoUsuario - Peso del usuario en kilogramos.
 * @param {number} tiempoTotalEnSegundos - Tiempo total de ejercicio en segundos.
 * @param {number} MET - MET del ejercicio (valor predeterminado: 8 para ejercicio moderado).
 * @returns {number} - Calorías quemadas.
 */
export const calcularCaloriasQuemadas = (pesoUsuario, tiempoTotalEnSegundos, MET = 8) => {
    const tiempoEnHoras = tiempoTotalEnSegundos / 3600; // Convertir segundos a horas
    return MET * pesoUsuario * tiempoEnHoras;
};
