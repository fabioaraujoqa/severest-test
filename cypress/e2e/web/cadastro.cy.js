/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import dadosUsuario from '../../fixtures/usuarios.json'

describe('Funcionalidade: Cadastro', () => {

    beforeEach(() => {
        cy.visit('cadastrarusuarios')
    });
    
    it('Deve fazer o cadastro com sucesso (usando método Date.Now)', () => {
        var email = 'fabio' + Date.now() + '@teste.com'
        cy.CadastroUsuarioComum('Fábio Araújo', email, 'teste@123')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
      });

      it('Deve fazer o cadastro com sucesso (usando biblioteca Faker)', () => {
        cy.CadastroUsuarioComum(faker.person.fullName(), faker.internet.email(), faker.internet.password())
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
      });

      it.skip('Deve validar campo de email válido', () => {
        cy.CadastroUsuarioComum('Fabio teste', 'fabio!gmail.com', 'senha@123')
        cy.window().then((win) => {
          const alertElement = win.document.querySelector('.seletor-do-elemento-alerta');
          expect(alertElement).to.contain('Inclua um "@" no endereço de e-mail');
        });

      });

      it('Deve fazer cadastro com sucesso com admin- usando comando Customizado', () => {
        cy.CadastroUsuarioAdmin('Fabio teste',faker.internet.email(), 'senha@123')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
        cy.get('.lead',{timeout: 10000}).should('contain', 'Este é seu sistema para administrar seu ecommerce.')
      });

      it('Deve fazer cadastro com sucesso sem admin usando comando Customizado', () => {
        cy.CadastroUsuarioComum('Fabio teste',faker.internet.email(), 'senha@123')
        cy.get('.alert').should('contain', 'Cadastro realizado com sucesso')
        cy.get('h1', {timeout: 10000}).should('contain', 'Serverest Store')
      });

      it.skip('Cadastrar usuario com sucesso usando importação de dados', () => {
        cy.CadastroUsuarioComum(dadosUsuario[0].nome, dadosUsuario[0].email, dadosUsuario[0].senha)
        cy.get('h1', {timeout: 10000}).should('contain', 'Serverest Store')
      });
});
