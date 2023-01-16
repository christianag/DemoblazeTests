const USERNAME = Cypress.env('USERNAME')
const PASSWORD = Cypress.env('PASSWORD')
const ITEM_ID = 2;

describe('UI tests for DemoBlaze website', () => {

  beforeEach(()=> {
    cy.visit('/')
  })

  it('Confirm There Are Only 3 Categories', () => {
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group').should('be.visible')
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group > #cat').contains('CATEGORIES')
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group > #itemc').should('have.length', 3)
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group > #itemc').should('contain', 'Phones')
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group > #itemc').should('contain', 'Laptops')
    cy.get('#contcont > :nth-child(1) > .col-lg-3 > .list-group > #itemc').should('contain', 'Monitors')
  })
 
  it('Each Item in "Home" Page Shows The Price Tag', () => {
    cy.get('.active > .nav-link').should('be.visible').contains('Home').click()
    cy.url().should('contain', '/index.html')
    cy.get('#tbodyid').should('be.visible')
    // we are iterating through items in table of products to make sure they all have price tags
    cy.get('#tbodyid').each(($div) => {
      cy.get('.card > .card-block > h5').should('exist')
    })
  })

  it('Video is Not Playing Automatically', () => {
    cy.get('#videoModal').should('have.css', 'display', 'none')
    cy.get(':nth-child(3) > .nav-link').should('be.visible').contains('About us').click()
    cy.get('#videoModal').should('have.css', 'display', 'block')
    cy.get('#example-video').should('have.class', 'vjs-paused')
    cy.get('#example-video').should('not.have.class', 'vjs-playing')
    cy.get('#example-video').should('not.have.class', 'vjs-has-started')
  })

  it('Adding 1 Item to Cart of Logged-In User', () => {
    // created a personalized cypress command for logging in
    // located in cypress/support/commands.js
    cy.Login(USERNAME, PASSWORD)
    // i tried to randomize the item that will be added to the cart
    // however I wasn't able to make it work with a standard <<< Math.floor((Math.random()*9) >>>
    // so instead i added an ITEM_ID variable that can be manually adjusted
    const itemLocation = '#tbodyid > div:nth-child(' + ITEM_ID + ')'
    // now we check that there are indeed 9 items on the home page
    cy.get('#tbodyid').find('.col-lg-4').its('length').should('eq', 9)
    // I want to store the name of the item in a variable for later assertions
    // which is why i'm using .then() here
    cy.get(itemLocation).find('.card-title').then($name => {
        const itemName = $name.text()
        // click on the selected item
        cy.get(itemLocation).find('.card-img-top').click()
        // check if you are on the page of the item you clicked on 
        // by checking the name and the id in the url
        cy.url().should('contain', 'prod.html?idp_=' + ITEM_ID)
        cy.get('.name').contains(itemName)
        //add item to cart
        cy.get('.col-sm-12 > .btn').click()
        // check if you're getting the correct alert message
        cy.on('window:alert',(AlertText) => {
          expect(AlertText).eql('Product added.')
        })
        // & an additional check to make sure correct item is in cart
        cy.get('#cartur').click()
        cy.get('#tbodyid > .success').should('length', 1).contains(itemName)
        // clean cart after assertions passes
        cy.get('#tbodyid > tr > td:nth-child(4) > a').click()
    })
  })

})
