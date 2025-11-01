class home {
    validaPaginaHome() {
        cy.get('.fa-home').parent().should('have.attr', 'style').and('include', 'color: orange');
    }

    rolarAteRodaPe() {
        cy.scrollTo('bottom');
    }

    inserirEmailEEnviar(email) {
        cy.get('input#susbscribe_email').type(email);
        cy.get('button#subscribe').click();
    }

    removerContaCriada(){
        cy.get('a[href="/delete_account"]').click();
    }
}
export default new home();