describe('Pruebas Unhappy Path - Login', () => {
  
  beforeEach(() => {
    
    cy.visit('http://localhost:5173/login'); 
  });

  it('Debe mostrar un error cuando se envia un email invalido', () => {
    cy.get('input[name="email"]').type('correo_invalido@sdsdf'); 
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Email Invalido...').should('be.visible');
  });

  it('Debe mostrar un error cuando la contraseña es incorrecta', () => {
    cy.get('input[name="email"]').type('usuario@test.com');
    cy.get('input[name="password"]').type('incorrecta123');
    cy.get('button[type="submit"]').click();

    cy.contains('Usuario no encontrado...').should('be.visible');
  });

  it('Debe mostrar un error cuando se deja el campo de contraseña vacío', () => {
    cy.get('input[name="email"]').type('usuario@test.com');
    cy.get('button[type="submit"]').click();

    cy.contains('Password es Necesario!').should('be.visible');
  });

  it('Debe mostrar un error cuando se deja el campo de correo vacío', () => {
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains('Email es Necesario!').should('be.visible');
  });
  
});
