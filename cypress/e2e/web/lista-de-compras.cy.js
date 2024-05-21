/// <reference types="cypress" />

describe('Funcionalidade: Lista de compras', () => {

    beforeEach(() => {
        cy.login('fabio@araujo.com','teste@123')
    });

    it('Validar entrada na lista de compras', () => {
        cy.visit('minhaListaDeProdutos')
        cy.get('h1').should('contain', 'Lista de Compras')
        cy.url().should('contain', 'minhaListaDeProdutos')
        
    });
    
});