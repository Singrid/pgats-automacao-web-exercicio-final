class produto {
    
    clicarNoPrimeiroProduto() {
        cy.get('a[href="/product_details/1"]').click();
    }

    verificarTelaDetalheDoProduto() {
        cy.url().should('include', 'product_details');
    }

    validaTituloParaProdutos(titulo) {
        cy.get('h2.title.text-center').should('have.text', titulo);
    }

    verificarTodosOsDetalhesDoProduto() {
        cy.get('div.product-information h2')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Category')
            .should('be.visible');
        cy.get('div.product-information span span')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Availability')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Condition')
            .should('be.visible');
        cy.get('div.product-information p')
            .should('contain.text', 'Brand')
            .should('be.visible');
    }

    pesquisarPorUmProdutoExistente(nome, time = 0){
        cy.get('input#search_product').clear().type(nome, { delay: time });
        cy.get('button#submit_search').click();

    }
}

export default new produto();
