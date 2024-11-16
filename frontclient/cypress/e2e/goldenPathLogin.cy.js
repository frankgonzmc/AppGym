describe('Golden Path - Login de usuario', () => {
    before(() => {
        // Limpiar cookies o cualquier dato anterior
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Debería loguear un usuario registrado exitosamente con verificaciones adicionales', () => {
        // Visitar la página de login
        cy.visit('http://100.125.85.115:5173/login');

        // Verificar que los elementos de la página de login están visibles
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible'); // Eliminar la verificación de que esté deshabilitado

        // Ingresar email y contraseña
        cy.get('input[name="email"]').type('pepe@prueba.com');
        cy.get('input[name="password"]').type('pepe12345678911');
        
        // Verificar que el botón está habilitado después de llenar los campos
        cy.get('button[type="submit"]').should('not.be.disabled').click();

        // Verificar redirección al dashboard o página de inicio
        cy.url().should('include', '/inicio');

        // Verificar que el contenedor principal de la página de inicio está visible
        cy.get('.inicio-container').should('be.visible');

        // Verificar la presencia de elementos clave en el dashboard/inicio (opcional, según lo que esperes ver)
        cy.contains('Bienvenido: pepe').should('be.visible');
    });
});