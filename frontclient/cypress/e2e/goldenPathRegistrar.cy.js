describe('Golden Path - Registro de usuario', () => {
    before(() => {
        // Limpiar cookies y cualquier dato anterior de sesiones previas
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Debería registrar un nuevo usuario exitosamente con verificaciones adicionales', () => {
        // Visitar la página de registro
        cy.visit('http://localhost:5173/register');

        // Verificar que los elementos del formulario de registro están visibles
        cy.get('input[name="username"]').should('be.visible');
        cy.get('input[name="email"]').should('be.visible');
        cy.get('input[name="password"]').should('be.visible');
        cy.get('input[name="edad"]').should('be.visible');
        cy.get('input[name="estatura"]').should('be.visible');
        cy.get('input[name="peso"]').should('be.visible');

     

        // Completar el formulario de registro
        cy.get('input[name="username"]').type('Alex');
        cy.get('input[name="email"]').type('alex2@prueba.com');
        cy.get('input[name="password"]').type('alex12345');
        cy.get('input[name="edad"]').type('22');
        cy.get('input[name="estatura"]').type('1.69');
        cy.get('input[name="peso"]').type('63');

        // Verificar que el botón se habilita después de llenar todos los campos
        cy.get('button[type="submit"]').should('not.be.disabled').click();

        // Verificar que se redirige correctamente al inicio o dashboard
        cy.url().should('include', '/inicio');
        cy.get('.inicio-container').should('be.visible');

        // Verificar la presencia de elementos clave en la página de inicio
        cy.contains('Bienvenido: Alex').should('be.visible');
        cy.get('.inicio-container').should('exist');
    }); 
});
