// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.

// Disable uncaught exception handling for API tests
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

// Custom commands
Cypress.Commands.add('visitApp', () => {
  cy.visit('/');
  cy.wait(1000); // Wait for app to fully load
});

Cypress.Commands.add('waitForProductsToLoad', () => {
  cy.get('img[alt*=""]', { timeout: 15000 }).should('exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      visitApp(): Chainable<void>;
      waitForProductsToLoad(): Chainable<void>;
    }
  }
}

export {};
