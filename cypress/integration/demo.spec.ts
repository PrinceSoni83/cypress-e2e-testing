/// <reference types="cypress" />

const locators = {
  loginLink : 'li>a:contains("Login")',
  docsLink : 'a:contains("Docs")',
  installInfoEditBox : '.with-bash-effects',
  loginWithEmailButton : 'span:contains("Log in with Email")',
  userNameEdit : '#email',
  passwordEdit : '#password',
  loginButton : '.btn-primary',
  errorText : '.error-message',
  yourOrgText : 'h1:contains("Your Organizations")'
}

beforeEach(() => {
  // runs before each test in the block
  cy.visit("https://cypress.io");
});

describe("Demo tests on Cypress Websites", () => {
  it("Opens the Cypress home page", () => {
    cy.get(locators.loginLink).should("be.visible");
    cy.get(locators.docsLink).should("be.visible");
    cy.get(locators.installInfoEditBox).should("contain.text", "npm install cypress");
  });

  it("Login into to cypress using invalid user name", () => {
    cy.get(locators.loginLink).invoke("removeAttr", "target").click();
    cy.url().should("eq", "https://dashboard.cypress.io/login");
    cy.get(locators.loginWithEmailButton).click();
    cy.fixture('accounts').then((account) => {
      cy.get(locators.userNameEdit).type(account.invalidEmail);
    })
    cy.get(locators.loginButton).click();
    cy.get(locators.errorText).should("contain.text", "Missing credentials");
  });

  it("Login into to cypress using valid user name and password", () => {
    cy.get(locators.loginLink).invoke("removeAttr", "target").click();
    cy.url().should("eq", "https://dashboard.cypress.io/login");
    cy.get(locators.loginWithEmailButton).click();
    cy.fixture('accounts').then((account) => {
      cy.get(locators.userNameEdit).type(account.userName);
      cy.get(locators.passwordEdit).type(account.password);
    })
    cy.get(locators.loginButton).click();
    cy.get(locators.yourOrgText).should("be.visible");
  });

  it('login with cy.request method', () => {
      cy.request('POST','https://authenticate.cypress.io/login/local?source=dashboard',
        {
            email: "test.cypress@outlook.com",
            password: "cypress-automation"
        }
      ).then((res) => {
          expect(res.status).to.eq(200);
          expect(res).to.have.property('headers');
          cy.visit("https://dashboard.cypress.io/login");
      })
  })
});
