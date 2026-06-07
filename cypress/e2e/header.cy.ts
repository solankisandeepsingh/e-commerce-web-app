describe('Header Component E2E Tests', () => {
  beforeEach(() => {
    cy.visitApp();
    cy.wait(1000);
  });

  it('should display store logo', () => {
    cy.contains('Sandeep-Store').should('be.visible');
  });

  it('should display shopping cart button', () => {
    cy.get('button').contains(/\d+ items/).should('be.visible');
  });

  it('should initialize cart with 0 items', () => {
    cy.get('button').contains('0 items').should('be.visible');
  });

  it('should update cart count after adding product', () => {
    // Add product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(500);
    
    // Verify cart count changed
    cy.get('button').contains(/[1-9]\d* items/).should('exist');
  });

  it('should display multiple items count correctly', () => {
    // Add first product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Add second product
    cy.get('button').contains('Add to Cart').eq(1).click();
    cy.wait(300);
    
    // Verify count shows 2 items
    cy.get('button').contains('2 items').should('be.visible');
  });

  it('should navigate to checkout when clicking cart button', () => {
    // Add a product first
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(500);
    
    // Click cart button
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify navigation to checkout
    cy.url().should('include', '/checkout');
  });

  it('should navigate to home when clicking logo', () => {
    // Add product and go to checkout
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Click on logo/store name
    cy.contains('Sandeep-Store').click();
    cy.wait(500);
    
    // Verify back on homepage
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should have shopping cart icon', () => {
    // Look for SVG icon in the cart button
    cy.get('button').contains(/\d+ items/).within(() => {
      cy.get('svg').should('exist');
    });
  });

  it('should have sticky header', () => {
    // Scroll down
    cy.scrollTo('bottom');
    cy.wait(500);
    
    // Header should still be visible
    cy.contains('Sandeep-Store').should('be.visible');
    cy.get('button').contains(/\d+ items/).should('be.visible');
  });

  it('should maintain header styling', () => {
    // Check header has expected classes
    cy.get('header').should('have.class', 'sticky');
    cy.get('header').should('be.visible');
  });

  it('should persist cart count across navigation', () => {
    // Add products
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    cy.get('button').contains('Add to Cart').eq(1).click();
    cy.wait(300);
    
    // Go to product detail
    cy.get('h3').first().click();
    cy.wait(500);
    
    // Cart count should still show
    cy.get('button').contains('2 items').should('be.visible');
    
    // Go back
    cy.contains('Back to Products').click();
    cy.wait(500);
    
    // Cart count should still be there
    cy.get('button').contains('2 items').should('be.visible');
  });

  it('should update cart when adding from product detail page', () => {
    // Add from homepage
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Go to product detail
    cy.get('h3').first().click();
    cy.wait(500);
    
    // Add from detail page
    cy.get('button').contains('Add to Cart').click();
    cy.wait(500);
    
    // Verify cart updated
    cy.get('button').contains('2 items').should('be.visible');
  });
});
