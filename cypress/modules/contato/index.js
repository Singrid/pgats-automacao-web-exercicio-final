class contato {
    preencherFormularioDeContato(name, email, subject, message) {
        cy.get('input[data-qa="name"]').type(name);
        cy.get('input[data-qa="email"]').type(email);
        cy.get('input[data-qa="subject"]').type(subject);
        cy.get('textarea[data-qa="message"]').type(message);
    }

    enviarFormularioDeContato(file) {
        cy.get('input[type=file]').selectFile('cypress/fixtures/example.json')       
        cy.get('input[data-qa="submit-button"]').click();
    }
}

export default new contato();