/// <reference types="cypress" />
import dados from '../../fixtures/usuario-api.json'
const urlBase = 'http://localhost:3000/'

describe('API - Produtos', () => {

    beforeEach(() => {
        cy.token(dados.email, dados.senha).as('token')
    });

    it('Deve listar produtos com sucesso', () => {
        cy.request({
            method: 'GET',
            url: urlBase + 'produtos'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.duration).to.be.lessThan(30)
            expect(response.body).to.have.property('produtos')
            expect(response.body).to.have.property('quantidade')
        })
    });

    it('Deve cadastrar um produto com sucesso', function () {
        let produto = `Produto teste ${Date.now()}`
        cy.request({
            method: 'POST',
            url: urlBase + 'produtos',
            body: {
                "nome": produto,
                "preco": 470,
                "descricao": "Óculos...",
                "quantidade": 381
            },
            headers: {
                authorization: this.token
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve alterar dados do produto com sucesso', function () {
        let produtoAlterado = `Produto teste ${Date.now()}`
        cy.cadastrarProduto(this.token)
            .then((response) => {
                cy.log(response.body._id)
                var id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: urlBase + 'produtos/' + id,
                    body:
                    {
                        "nome": produtoAlterado,
                        "preco": 100,
                        "descricao": "Descrição alterada",
                        "quantidade": 100
                    },
                    headers: {
                        authorization: this.token
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
                })
            })
    });

    it('Deve excluir o produto com sucesso', function () {
        cy.cadastrarProduto(this.token)
            .then((response) => {
                cy.log(response.body._id)
                var id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: urlBase + 'produtos/' + id,
                    headers: {
                        authorization: this.token
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')
                })
            })
    });
});