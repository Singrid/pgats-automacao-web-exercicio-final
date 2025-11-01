class menu {
    navegarParaLogin() {
        cy.get('a[href="/login"]').click();
    }

    efetuarLogout() {
        cy.get('a[href="/logout"]').click();
    }

    navegarParaContactUs() {
        cy.get('a[href*="/contact"]').click();
    }

    navegarParaProdutos() {
        cy.get('a[href*="/products"]').click();
    }

    navegarParaCarrinho() {
        cy.get('a[href*="/view_cart"]').first().click();
    }
}
export default new menu();