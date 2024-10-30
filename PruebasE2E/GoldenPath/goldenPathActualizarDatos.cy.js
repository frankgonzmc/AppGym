describe('Golden Path: Cambio de contraseña', () => {
    before(() => {
      // Aquí puedes usar cy.session si ya configuraste sesiones
      cy.visit('http://localhost:5173/login');
      cy.get('input[type="email"]').type('pepe@prueba.com');
      cy.get('input[type="password"]').type('pepe12345678910');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/inicio');
      cy.getCookies().then((cookies) => {
        cy.log(cookies);  // Esto imprimirá todas las cookies en la consola de Cypress
        expect(cookies).to.have.length.greaterThan(0);  // Asegúrate de que hay cookies después del login
      });
    });
  
    it('Debería cambiar la contraseña correctamente en el flujo Golden Path', () => {
      // Ir a la página de cambio de contraseña
      cy.visit('http://localhost:5173/profile');
  
      // Escribir en "Contraseña actual"
      cy.contains('label', 'Contraseña actual:').siblings('input').type('pepe12345678910');
  
      // Escribir en "Nueva contraseña"
      cy.contains('label', 'Nueva contraseña:').siblings('input').type('pepe12345678911');
  
      // Escribir en "Confirmar nueva contraseña"
      cy.contains('label', 'Confirmar nueva contraseña:').siblings('input').type('pepe12345678911');
  
      // Enviar el formulario
      cy.get('button[type="submit"]').click();

    });
  });
  