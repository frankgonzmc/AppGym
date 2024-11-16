describe('Golden Path - Crear rutina por usuario logueado', () => {
    beforeEach(() => {
        // Usar cy.session para mantener la sesión activa entre pruebas
        cy.session('usuarioSesion', () => {
            cy.visit('http://100.125.85.115:5173/login');
            cy.get('input[name="email"]').type('alex2@prueba.com');
            cy.get('input[name="password"]').type('alex12345');
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
    
    it('Las rutinas creadas deberían guardarse y mostrarse en rutinas', () => {
        cy.visit('http://100.125.85.115:5173/add-rutinas');  // Visitar la página de agregar rutina
        
        // Verificar que los elementos del formulario están visibles
        cy.get('input[name="nombre"]').should('be.visible');
        cy.get('textarea[name="descripcion"]').should('be.visible');
        cy.get('input[value="670552af7119492283741722"]').should('be.visible'); // Ajusta según tus valores
        cy.get('input[value="670552af7119492283741725"]').should('be.visible'); // Ajusta según tus valores
        
        // Completar el formulario de rutina
        cy.get('input[name="nombre"]').type('Rutina Piernas');
        cy.get('textarea[name="descripcion"]').type('Rutinas para muslos y glúteos.');
        cy.get('input[value="670552af7119492283741722"]').check();
        cy.get('input[value="670552af7119492283741725"]').check();
        
        // Verificar que el botón de enviar esté habilitado antes de hacer clic
        cy.get('button[type="submit"]').should('be.visible').and('not.be.disabled').click();
        
        // Verifica si fue redirigido a la página de rutinas
        cy.url().should('include', '/rutinas');
        cy.get('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-2').should('be.visible');
        
        // Verificar que la rutina creada aparece en la lista
        cy.contains('Rutina Piernas').should('be.visible'); // Asegúrate de que el nombre coincida
        cy.contains('Rutinas para muslos y glúteos.').should('be.visible'); // Verificar descripción si se muestra
    });
});
