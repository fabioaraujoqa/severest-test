/// <reference types="cypress" />

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });
    
    it('Deve fazer o cadastro com sucesso', () => {
        cy.get('[data-testid="nome"]').clear().type('Fabio Araújo')
        cy.get('[data-testid="email"]').clear().type('fabio6@teste.com')
        cy.get('[data-testid="password"]').clear().type('teste@123')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
    });

});