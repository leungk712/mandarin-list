describe('Navigation Drawer', () => {
    before(() => {
        cy.visit('/');

        cy.get('[data-testid=navbar-login-btn]')
          .click();

    //     cy.url().should('include', '/login');

    //     cy.get('[data-testid=login-link]')
    //       .click();

    //     cy.get('[data-testid=login-email-input]')
    //       .type('l@k.com')
    //       .should('have.value', 'l@k.com');

    //     cy.get('[data-testid=login-password-input]')
    //       .type('hello1234!')
    //       .should('have.value', 'hello1234!');

    //     cy.get('[data-testid=submit-login-register-btn]')
    //       .click();
    });

    it('can expand the navigation drawer', () => {
        cy.get('[data-testid=navigation-drawer]')
          .click();
    });

    it('clicking on profile link will direct me to Profile section', () => {
        cy.get('[data-testid=navigation-drawer]')
          .click();

        cy.get('[data-testid=nav-drawer-profile-link]')
          .click();
        
        cy.url().should('include', '/profile');
    });
});