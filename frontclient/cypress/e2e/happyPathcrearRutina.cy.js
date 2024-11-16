describe('Crear rutina por usuario logueado', () => {
    beforeEach(() => {
        // Usar cy.session para mantener la sesión activa entre pruebas
        cy.session('usuarioSesion', () => {
          cy.visit('http://localhost:5173/login');
          cy.get('input[name="email"]').type('pepe@prueba.com');
          cy.get('input[name="password"]').type('pepe123456');
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
    
    it('Las rutinas creadas deberian guardarse y mostrarse en rutinas', () => {
      //cy.visit('http://localhost:5173/inicio')
      cy.visit('http://localhost:5173/add-rutinas');  // Cambia la URL según tu ruta de registro
      cy.get('input[name="nombre"]').type('Rutina Piernas');
      cy.get('textarea[name="descripcion"]').type('Rutinas para muslos y gluteos.');
      cy.get('input[value="670552af7119492283741722"]').check();
      cy.get('input[value="670552af7119492283741725"]').check();
      cy.get('button[type="submit"]').click()
      // Verifica si fue redirigido al dashboard o se muestra un mensaje de éxito
      cy.url().should('include', '/rutinas');
      cy.get('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-2').should('be.visible');
    })
  })
  