const API_URL = Cypress.env('API_BASE_URL')
const ENCRYPTED_PASSWORD = "UGFzczEyMzQh"
const SAMSUNG_ID = 1
const SAMSUNG_ENCRYPTED_ID = "9df60dac-1eb4-8c48-e0ea-286748906ff7"
const HTC_ID = 7
const HTC_ENCRYPTED_ID = "426c3f50-0c93-3621-3258-c9c1d6cbed4d"
const ENTRIES_TOTAL = 9
const PHONES_TOTAL = 7
const LAPTOPS_TOTAL = 6
const MONITORS_TOTAL = 2
let TOKEN

describe('API tests for DemoBlaze website', () => {

    before('Make Sure Cart is Clean Before Tests', () => {
        cy.CleanCart(API_URL, SAMSUNG_ENCRYPTED_ID, HTC_ENCRYPTED_ID)
    })

    after('Clean Cart After Tests', () => {
        cy.CleanCart(API_URL, SAMSUNG_ENCRYPTED_ID, HTC_ENCRYPTED_ID)
    })

    it('GET - Entries Amount', () => { 
        cy.request({
            method: 'GET',
            url: `${API_URL}/entries`
        }).should(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.Items.length).to.eq(ENTRIES_TOTAL)
        })
    })

    it('POST - Total Amout of Phones', () => { 
        cy.request({
            method: 'POST',
            url: `${API_URL}/bycat`,
            body: {
                cat: 'phone'
            }
        }).as('Phones')

        cy.get('@Phones').should(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.Items.length).to.eq(PHONES_TOTAL)
        })
    })

    it('POST - Total Amout of Laptops', () => { 
        cy.request({
            method: 'POST',
            url: `${API_URL}/bycat`,
            body: {
                cat: 'notebook'
            }
        }).as('Laptops')
    
        cy.get('@Laptops').should(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.Items.length).to.eq(LAPTOPS_TOTAL)
        })
    })

    it('POST - Total Amout of Monitors', () => { 
        cy.request({
            method: 'POST',
            url: `${API_URL}/bycat`,
            body: {
                cat: 'monitor'
            }
        }).as('Monitors')
    
        cy.get('@Monitors').should(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.Items.length).to.eq(MONITORS_TOTAL)
        })
    })

    it('POST - Login Programatically', () => { 
        cy.request({
            method: 'POST',
            url: `${API_URL}/login`,
            body: {
                username: Cypress.env('USERNAME'),
                password: ENCRYPTED_PASSWORD
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            //getting the user auth token from the response body
            TOKEN = response.body.split(' ')[1]
        })
    })

    it('POST - Add "Samsung Galaxy S6" to Cart', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/addtocart`,
            body: {
                cookie: TOKEN,
                prod_id: SAMSUNG_ID,
                flag: true,
                id: SAMSUNG_ENCRYPTED_ID
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('POST - Add "HTC One M9" to Cart', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/addtocart`,
            body: {
                cookie: TOKEN,
                prod_id: HTC_ID,
                flag: true,
                id: HTC_ENCRYPTED_ID
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('POST - Confirm That Both Items are in Cart', () => {
        cy.request({
            method: 'POST',
            url: `${API_URL}/viewcart`,
            body: {
                cookie: TOKEN,
                flag: true
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.Items.length).to.eq(2)
            expect(response.body.Items[0].cookie).to.eq(Cypress.env('USERNAME'))
            expect(response.body.Items[0].id).to.eq(HTC_ENCRYPTED_ID)
            expect(response.body.Items[0].prod_id).to.eq(HTC_ID)
            expect(response.body.Items[1].cookie).to.eq(Cypress.env('USERNAME'))
            expect(response.body.Items[1].id).to.eq(SAMSUNG_ENCRYPTED_ID)
            expect(response.body.Items[1].prod_id).to.eq(SAMSUNG_ID)
        })
    })

})