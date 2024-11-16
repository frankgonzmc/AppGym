describe('Golden Path - Editar rutina por usuario logueado', () => {
    beforeEach(() => {
        // Usar cy.session para mantener la sesión activa entre pruebas
        cy.session('usuarioSesion', () => {
            cy.visit('http://localhost:5173/login');
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

    it('Las rutinas editadas deberían guardarse y mostrarse en rutinas', () => {
        // Visitar la página de rutinas
        cy.visit('http://localhost:5173/rutinas');  
        
        // Encontrar y hacer clic en el botón de editar
        cy.contains('button', 'Editar').click();
        
        // Verifica que se redirige a la página de edición de rutina
        cy.url().should('include', '/rutinas/');
        
        // Verificar que los campos de formulario están visibles y se pueden editar
        cy.get('input[name="nombre"]').should('be.visible').clear().type('Piernas - tren inferior');
        cy.get('textarea[name="descripcion"]').should('be.visible').clear().type('Rutina actualizada');
        
        // Hacer clic en el botón de enviar para guardar los cambios
        cy.get('button[type="submit"]').should('be.visible').click();
        
        // Verificar que se redirige de vuelta a la página de rutinas
        cy.url().should('include', '/rutinas');
        
        // Verificar que la rutina editada se muestra correctamente
        cy.get('.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-2').should('be.visible');
        cy.contains('Piernas - tren inferior').should('be.visible'); // Asegúrate de que el nombre editado aparece
        cy.contains('Rutina actualizada').should('be.visible'); // Verificar que la descripción actualizada aparece
    });
});
