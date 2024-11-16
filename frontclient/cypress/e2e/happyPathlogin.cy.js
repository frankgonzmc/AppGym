describe('Happy Path - Login de ususario', () => {
    it('Debería loguear un usuario registrado exitosamente', () => {
      cy.visit('http://100.125.85.115:5173/login')  // Cambia la URL según tu ruta de registro
      cy.get('input[name="email"]').type('frankpuertas@prueba.com')
      cy.get('input[name="password"]').type('frank12345')
      cy.get('button[type="submit"]').click()
      
      // Verifica si fue redirigido al dashboard o se muestra un mensaje de éxito
      cy.url().should('include', '/inicio');
      cy.get('.inicio-container').should('be.visible');
    })
})
  