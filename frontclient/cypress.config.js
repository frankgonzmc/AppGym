import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: true,
    // Configura la URL base de tu aplicación (ajústala según tu proyecto)
    baseUrl: 'http://localhost:5173', 
    
    // Definir el patrón de los archivos de prueba para buscar en cypress/e2e
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      // Implementar eventos aquí si es necesario
    },
  },
});