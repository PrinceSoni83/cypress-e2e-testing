/// <reference types="cypress" />

const locators: Record<string, string> = {
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

export class LoginPage {
   verifyHomePage(): void {
    cy.get(locators.loginLink).should("be.visible");
    cy.get(locators.docsLink).should("be.visible");
    cy.get(locators.installInfoEditBox).should("contain.text", "npm install cypress");
   }

   loginWithInvalidUser():void {
    cy.get(locators.loginLink).invoke("removeAttr", "target").click();
    cy.url().should("eq", "https://dashboard.cypress.io/login");
    cy.get(locators.loginWithEmailButton).click();
    cy.fixture('accounts').then((account) => {
      cy.get(locators.userNameEdit).type(account.invalidEmail);
    })
    cy.get(locators.loginButton).click();
    cy.get(locators.errorText).should("contain.text", "Missing credentials");
   }

   loginWithValidUser(): void {
    cy.get(locators.loginLink).invoke("removeAttr", "target").click();
    cy.url().should("eq", "https://dashboard.cypress.io/login");
    cy.get(locators.loginWithEmailButton).click();
    cy.fixture('accounts').then((account) => {
      cy.get(locators.userNameEdit).type(account.userName);
      cy.get(locators.passwordEdit).type(account.password);
    })
    cy.get(locators.loginButton).click();
    cy.get(locators.yourOrgText).should("be.visible");
   }

   loginWithCypressRequest(): void {
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
   }
}