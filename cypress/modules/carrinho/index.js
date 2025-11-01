import { faker } from '@faker-js/faker';

class carrinho {
    adicionarProdutosAoCarrinho(productId) {
         cy.get(`a[data-product-id="${productId}"].add-to-cart`)
            .first()
            .should('be.visible')
            .click();
    }

    continuarComprando() {
        cy.contains('button', 'Continue Shopping').click();
    }

    irParaChekout() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    realizarRevisaoDecompraEEndereco(produto, endereco) {
        cy.get('h2.heading').should('have.text', produto);
        cy.get('h2.heading').should('have.text', endereco);
    }

    realizaComentariosSobreACompra(message) {
        cy.get('textarea[name="message"]').type(message);
    }

    irParaFazerPedido() {
        cy.get('a.btn.btn-default.check_out').click();
    }

    inserirDadosDePagamentoEPagar() {
        cy.get('input[data-qa=name-on-card]').type(faker.person.fullName());
        cy.get('input[data-qa=card-number]').type(faker.finance.creditCardNumber());
        cy.get('input[data-qa=cvc]').type(faker.finance.creditCardCVV());
        cy.get('input[data-qa=expiry-month]').type(faker.date.future().getMonth() + 1);
        cy.get('input[data-qa=expiry-year]').type(faker.date.future().getFullYear());
        cy.get('[data-qa="pay-button"]').click();
    }

    continueParaHome(){
        cy.get('[data-qa="continue-button"]').click();
    }
}
export default new carrinho();