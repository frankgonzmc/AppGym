describe('Editar datos de usuario', () => {
    beforeEach(() => {
        // Usar cy.session para mantener la sesión activa entre pruebas
        cy.session('usuarioSesion', () => {
          cy.visit('http://100.125.85.115:5173/login');
          cy.get('input[name="email"]').type('pepe@prueba.com');
          cy.get('input[name="password"]').type('pepe1234567');
          cy.get('button[type="submit"]').click();
    
          // Verificar que la redirección fue exitosa
          cy.url().should('include', '/inicio');  // Ajusta la URL de redirección
    
          // Imprimir y verificar todas las cookies para diagnosticar
          cy.getCookies().then((cookies) => {
            cy.log(cookies);  // Esto imprimirá todas las cookies en la consola de Cypress
            expect(cookies).to.have.length.greaterThan(0);  // Asegúrate de que hay cookies después del login
          });
        });
      });
    it('Las rutinas editadas deberian guardarse y mostrarse en rutinas', () => {
      cy.visit('http://100.125.85.115:5173/profile')  
      // Escribir en "Contraseña actual"
      cy.contains('label', 'Contraseña actual:').siblings('input').type('pepe1234567');
      // Escribir en "Nueva contraseña"
      cy.contains('label', 'Nueva contraseña:').siblings('input').type('pepe12345678');
      // Escribir en "Confirmar nueva contraseña"
      cy.contains('label', 'Confirmar nueva contraseña:').siblings('input').type('pepe12345678');
      cy.get('button[type="submit"]').click();
      /*cy.url().should('include', '/inicio');
      cy.get('inicio-container').should('be.visible');*/
    })
  })
  