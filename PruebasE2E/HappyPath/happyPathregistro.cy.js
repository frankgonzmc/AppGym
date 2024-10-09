describe('Happy Path - Registro de usuario', () => {
    it('Debería registrar un nuevo usuario exitosamente', () => {
      cy.visit('http://localhost:5173/register')  // Cambia la URL según tu ruta de registro
      cy.get('input[name="username"]').type('Gonzalo')
      cy.get('input[name="email"]').type('frankpuertas@prueba.com')
      cy.get('input[name="password"]').type('frank12345')
      cy.get('input[name="edad"]').type('22')
      cy.get('input[name="estatura"]').type('1.69')
      cy.get('input[name="peso"]').type('63')
      cy.get('button[type="submit"]').click()
      
      // Verifica si fue redirigido al dashboard o se muestra un mensaje de éxito
      cy.url().should('include', '/inicio');
      cy.get('.inicio-container').should('be.visible');
      //cy.contains('Bienvenido, Usuario de prueba')
    })
  })
  