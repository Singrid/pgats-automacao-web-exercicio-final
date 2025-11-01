import { faker } from '@faker-js/faker'

class Cadastro {
    preencherFormularioDeCadastroCompleto() {
        cy.get('input#id_gender1').check()
        cy.get('input#password').type(faker.internet.password({ length: 6 }), { log: false })

        cy.get('select[data-qa=days]').select('10')
        cy.get('select[data-qa=months]').select('May')
        cy.get('select[data-qa=years]').select('2000')
     
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(faker.company.name())
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('[data-qa="country"]').select('United States')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('123456789')
        cy.get('[data-qa="create-account"]').click(); 
    }
}
export default new Cadastro();