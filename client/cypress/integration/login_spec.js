describe('Login View', () => {
    it('should visit the landing page and direct me to login route', () => {
        cy.visit('/');

        cy.get('[data-testid=navbar-login-btn]').click();

        cy.url().should('include', '/login');
    });
    // it('should register and be able to click "Register" once form is filled out', () => {
    //     cy.visit('http://localhost:8080/');

    //     cy.get('[data-testid=navbar-login-btn]').click();

    //     cy.url().should('include', '/login');

    //     cy.get('[data-testid=submit-login-register-btn]')
    //       .should('be.disabled');

    //     cy.get('[data-testid=register-first-name-input]')
    //       .type('Bob')
    //       .should('have.value', 'Bob')
    //       .get('[data-testid=register-first-name-input]:valid')
    //       .should('have.length', 1);

    //     cy.get('[data-testid=register-last-name-input]')
    //       .type('Ross')
    //       .should('have.value', 'Ross');

    //     cy.get('[data-testid=register-email-input]:invalid')
    //       .should('have.length', 1);

    //     cy.get('[data-testid=register-email-input]')
    //       .clear()
    //       .type('bobrosspaints@email.com')
    //       .should('have.value', 'bobrosspaints@email.com');

    //     cy.get('[data-testid=register-password-input]')
    //       .type('password1234!')
    //       .should('have.value', 'password1234!');

    //     cy.get('[data-testid=register-confirm-password-input]')
    //       .type('password1234!')
    //       .should('have.value', 'password1234!');

    //     cy.intercept(
    //         {
    //             method: 'POST',
    //             url: '/users/register'
    //         }
    //     ).as('apiCheck');

    //     cy.get('[data-testid=submit-login-register-btn]')
    //       .should('be.enabled')
    //       .click();
    // });
    it('should be able to login', () => {
        cy.visit('/');

        cy.get('[data-testid=navbar-login-btn]')
          .click();

        cy.url().should('include', '/login');

        cy.get('[data-testid=login-link]')
          .click();

        cy.get('[data-testid=login-email-input]')
          .type('l@k.com')
          .should('have.value', 'l@k.com');

        cy.get('[data-testid=login-password-input]')
          .type('hello1234!')
          .should('have.value', 'hello1234!');
        
        cy.get('[data-testid=submit-login-register-btn]')
          .should('be.enabled')
          .click();
    });
});