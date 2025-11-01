import { faker } from '@faker-js/faker';
import {
  getRandomEmail
} from '../../support/helpers'

class login {

    preencherFormularioDePreCadastro() {

        const firstName = faker.person.firstName()
        const lastName = faker.person.lastName()

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())

        cy.contains('button', 'Signup').click();
    }

    preecherFormularioParaLogin(user, password) {
        cy.get('[data-qa="login-email"]').type(user);
        cy.get('[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
    }

    preencherFormularioDePreCadastroComEmailExistente(nome, email) {
        cy.get('input[data-qa="signup-name"]').type(nome);
        cy.get('input[data-qa="signup-email"]').type(email);
        cy.contains('button', 'Signup').click();
    }

    clickNoBotaoContinueDepoisDoCadastro(){
        cy.get('[data-qa="continue-button"]').click();
    }
}

export default new login();

