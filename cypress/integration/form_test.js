// TODO Set up tests that will...
/* 
    ✅ Get the Name input and type a name in it.
    ✅ Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
    ✅ Get the Email input and type an email address in it
    ✅ Get the password input and type a password in it
    ✅ Set up a test that will check to see if a user can check the terms of service box
    ✅ Check to see if a user can submit the form data
    ✅ Check for form validation if an input is left empty
*/

// Describe
describe ('User Onboarding Form app', () => {
    // Arrange
    it('Grabs form fields, enters info, checks validation errors, & verifies user can submit form', () => {
        //Act
        //Visit page
        cy.visit("http://localhost:3000/")
        //Checks 'Name' label exists, grabs input field, types & tests a sample Name
        cy.contains('Name')
        cy.get('[name=name]')
            .type('ada')
            .should('have.value', 'ada')

        //Checks 'Email' label exists, grabs input field, types & tests INVALID sample Email
        cy.contains('Email')
        cy.get('[name=email]')
            .type('lovelace')
            .should('have.value', 'lovelace')

        //Checks 'Password' label exists, grabs input field, types & tests INVALID sample Pass
        cy.contains('Password')
        cy.get('[name=password]')
            .type('1234567')
            .should('have.value', '1234567')

        //Ensures INVALID inputs triggers correct error message
        cy.contains('Must be a valid email address')
        cy.contains('Must be at least 8 characters')
        
        // Clear Password field & ensure empty Password field generates correct requirement msg
        cy.get('[name=password]').clear()
        cy.contains('A password is required')

        // Clear email field then re-type VALID email
        cy.get('[name=email]').clear()
        cy.get('[name=email]')
            .type('love@lace.io')
            .should('have.value', 'love@lace.io')

        cy.get('[name=password]')
            .type('12345678')
            .should('have.value', '12345678')

        // Ensure Submit button is DISABLED if ToS checkbox has NOT been clicked
        cy.get('button').should('be.disabled')

        //Check the ToS checkbox; ensure button is ENABLED if ToS checkbox HAS been clicked
        cy.get('[name=haveRead]').check()
        cy.get('button').should('not.be.disabled')
    
        //Submit form & check for new user data
        cy.contains('You\'re the first one here')
        cy.get('button').click()
        cy.contains('ADA love@lace.io')
    })
})
