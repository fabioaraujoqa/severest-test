/// <reference types="cypress" />
import cadastroPage from '../../support/pages/cadastro.page';
import CadastroPage from '../../support/pages/cadastro.page'

describe('Funcionalidade: Cadastro - Usando Pages Objects', () => {
    beforeEach(() => {
        CadastroPage.visitarUrl()
    });

    it('Deve fazer cadastro de usuário admin com sucesso', () => {
        var email = `fabio${Date.now()}@teste.com`
        CadastroPage.CadastroUsuarioAdmin('Fabio teste Page', email, 'teste@123')
        cy.get('.lead',{timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce.')
    });

    it('Deve fazer cadastro de usuário comum com sucesso', () => {
        var email = `fabio${Date.now()}@teste.com`
        CadastroPage.CadastroUsuarioComumn('Fabio teste comum', email, 'teste@123')
    });
});