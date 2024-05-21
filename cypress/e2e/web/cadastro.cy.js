/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });
    
    it('Deve fazer o cadastro com sucesso (usando método Date.Now)', () => {
        var email = 'fabio' + Date.now() + '@teste.com'
        cy.get('[data-testid="nome"]', ).clear().type('Fabio Teste')
        cy.get('[data-testid="email"]').clear().type(email)
        cy.get('[data-testid="password"]').clear().type('teste@123')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
      });

      it('Deve fazer o cadastro com sucesso (usando biblioteca Faker)', () => {
        cy.get('[data-testid="nome"]', ).clear().type(faker.person.fullName())
        cy.get('[data-testid="email"]').clear().type(faker.internet.email())
        cy.get('[data-testid="password"]').clear().type(faker.internet.password())
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
      });

      it('Deve validar campo de email válido', () => {
        cy.get('[data-testid="nome"]', ).clear().type('Fábio Araújo')
        cy.get('[data-testid="email"]').clear().type('fabio!teste.com')
        cy.get('[data-testid="password"]').clear().type('teste@123')
        cy.get('[data-testid="checkbox"]').check()
        cy.get('[data-testid="cadastrar"]').click()
        //cy.contains('Inclua um "@" no endereço de e-mail').should('be.visible');

      });

      it('Deve fazer cadastro com sucesso com admin- usando comando Customizado', () => {
        cy.CadastroUsuarioAdmin('Fabio teste',faker.internet.email(), 'senha@123')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead',{timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce.')
      });

      it('Deve fazer cadastro com sucesso sem admin- usando comando Customizado', () => {
        cy.CadastroUsuarioComum('Fabio teste',faker.internet.email(), 'senha@123')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', {timeout: 10000}).should('contain', 'Serverest Store')
       
      });


});
