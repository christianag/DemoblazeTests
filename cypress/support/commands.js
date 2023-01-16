Cypress.Commands.add('Login', (username, password) => {
    cy.get('#logInModal').should('have.css', 'display', 'none')
    cy.get('#logInModal').should('not.have.class', 'show')
    cy.get('#login2').should('be.visible').contains('Log in').click()
    cy.get('#logInModal').should('have.css', 'display', 'block')
    cy.get('#logInModal').should('have.class', 'show')
    // the test kept breaking without the .wait()
    // the username would only get partially typed in the field every now and again
    cy.wait(500)
    cy.get('#loginusername').should('be.visible').type(username)
    cy.get('#loginpassword').should('be.visible').type(password)
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
    // giving the page the chance to fully reload before checking for the assertions
    cy.wait(500)
    cy.get('#logout2').should('be.visible').contains('Log out')
    cy.get('#nameofuser').should('contain', 'Welcome ' + username)
})

Cypress.Commands.add('CleanCart', (url, id1, id2) => {
    cy.request({
        method: 'POST',
        url: `${url}/deleteitem`,
        body: {
            id: id1
        }
    })
    cy.request({
        method: 'POST',
        url: `${url}/deleteitem`,
        body: {
            id: id2
        }
    })
})