Cypress.Commands.add('login', (email, password) => {
    // Visitar la página de inicio de sesión
    cy.visit('http://100.125.85.115:5173/login'); // Cambia esto a la URL de tu página de inicio de sesión
  
    // Completar el formulario de inicio de sesión
    cy.get('input[name="email"]').type(email); // Cambia el selector según tu estructura
    cy.get('input[name="password"]').type(password); // Cambia el selector según tu estructura
  
    // Enviar el formulario
    cy.get('button[type="submit"]').click();
  
    // Verificar que la redirección fue exitosa (ajusta según tu aplicación)
    cy.url().should('include', '/'); // Asegúrate de que esta URL corresponda a la vista correcta tras el inicio de sesión
  
    // Opcional: Verificar que se haya guardado el estado de sesión (localStorage, cookies, etc.)
    // cy.getLocalStorage('token').should('exist'); // Ejemplo, ajusta según tu lógica de autenticación
    cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        expect(token).to.exist; // Aquí es donde podría estar fallando si el token no existe
      });
  });
  

  Cypress.Commands.add('setToken', () => {
    const token = 'tu-token-de-prueba';  // Reemplaza por un token válido si tienes uno
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
    });
  });