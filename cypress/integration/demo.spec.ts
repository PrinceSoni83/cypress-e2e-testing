/// <reference types="cypress" />
import {LoginPage} from "../integration/page-objects/login-page"
const loginPage = new LoginPage();


beforeEach(() => {
  // runs before each test in the block
  cy.visit("https://cypress.io");
});

describe("Demo tests on Cypress Websites", () => {
  it("Opens the Cypress home page", () => {
    loginPage.verifyHomePage();
  });

  it("Login into to cypress using invalid user name", () => {
    loginPage.loginWithInvalidUser();
  });

  it("Login into to cypress using valid user name and password", () => {
    loginPage.loginWithValidUser();
  });

  it('login with cy.request method', () => {;
    loginPage.loginWithCypressRequest();
  })
});
