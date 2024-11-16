describe('Editar rutina por usuario logueado', () => {
    beforeEach(() => {
        // Usar cy.session para mantener la sesión activa entre pruebas
        cy.session('usuarioSesion', () => {
          cy.visit('http://localhost:5173/login');
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
      cy.visit('http://localhost:5173/rutinas')  
      cy.contains('button', 'Editar').click();
      // Verifica si fue redirigido al dashboard o se muestra un mensaje de éxito
      cy.url().should('include', '/rutinas/');
      cy.get('input[name="nombre"]').clear().type('Piernas - tren inferior');
      cy.get('textarea[name="descripcion"]').clear().type('Rutina actualizada');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/rutinas');
      cy.get('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-2').should('be.visible');
    })
  })
  