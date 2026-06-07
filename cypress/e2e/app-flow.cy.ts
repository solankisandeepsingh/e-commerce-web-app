describe('App Navigation Flow E2E Tests', () => {
  it('should complete full user journey: browse -> search -> add -> checkout', () => {
    // Start at homepage
    cy.visitApp();
    cy.wait(1000);
    
    // Verify homepage loaded with products
    cy.contains('Our Products').should('be.visible');
    cy.get('button').contains('Add to Cart').should('exist');
    
    // Search for a product
    cy.get('input[placeholder="Search products..."]').type('Keyboard');
    cy.wait(1500);
    
    // Add product to cart
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(500);
    
    // Verify cart updated
    cy.get('button').contains(/[1-9]\d* items/).should('exist');
    
    // Go to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify checkout page
    cy.url().should('include', '/checkout');
    cy.contains('Order Summary').should('be.visible');
  });

  it('should complete full user journey: browse -> detail -> add -> checkout', () => {
    // Start at homepage
    cy.visitApp();
    cy.wait(1000);
    
    // Click on first product
    cy.get('h3').first().click();
    cy.wait(1000);
    
    // Verify product detail page
    cy.url().should('include', '/product/');
    cy.get('h1').should('be.visible');
    
    // Add to cart
    cy.get('button').contains('Add to Cart').click();
    cy.wait(500);
    
    // Verify cart updated
    cy.get('button').contains(/[1-9]\d* items/).should('exist');
    
    // Go to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify checkout page
    cy.url().should('include', '/checkout');
    cy.contains('Order Total').should('be.visible');
  });

  it('should handle sorting with multiple products', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Sort by price ascending
    cy.get('select').select('price_asc');
    cy.wait(500);
    
    // Add first product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Change sort to descending
    cy.get('select').select('price_desc');
    cy.wait(500);
    
    // Add another product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Verify both in cart
    cy.get('button').contains('2 items').should('be.visible');
  });

  it('should handle search + sort combination', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Search
    cy.get('input[placeholder="Search products..."]').type('Smart');
    cy.wait(1500);
    
    // Sort
    cy.get('select').select('price_asc');
    cy.wait(500);
    
    // Verify results displayed
    cy.get('button').contains('Add to Cart').should('be.visible');
    
    // Check URL contains both params
    cy.url().should('include', 'search=Smart');
    cy.url().should('include', 'sort=price_asc');
  });

  it('should navigate between pages without losing cart', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Add product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Go to product detail
    cy.get('h3').first().click();
    cy.wait(1000);
    
    // Back to home
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    
    // Add another product
    cy.get('button').contains('Add to Cart').eq(1).click();
    cy.wait(300);
    
    // Verify both in cart
    cy.get('button').contains('2 items').should('be.visible');
  });

  it('should handle clearing search', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Search for non-existent product
    cy.get('input[placeholder="Search products..."]').type('NONEXISTENT12345');
    cy.wait(1500);
    
    // Click clear search
    cy.get('button').contains('Clear Search').click();
    cy.wait(500);
    
    // Verify original products shown
    cy.get('button').contains('Add to Cart').should('have.length.greaterThan', 0);
  });

  it('should handle multiple additions and cart interactions', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Add 3 products
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    cy.get('button').contains('Add to Cart').eq(1).click();
    cy.wait(300);
    cy.get('button').contains('Add to Cart').eq(2).click();
    cy.wait(300);
    
    // Verify count
    cy.get('button').contains('3 items').should('be.visible');
    
    // Go to checkout
    cy.get('button').contains('3 items').click();
    cy.wait(500);
    
    // Increase quantity of first product
    cy.get('button').contains('+').first().click();
    cy.wait(300);
    
    // Verify count updated to 4
    cy.get('button').contains('4 items').should('be.visible');
    
    // Remove a product
    cy.get('button').contains('-').first().click();
    cy.wait(300);
    
    // Count should be back to 3
    cy.get('button').contains('3 items').should('be.visible');
  });

  it('should properly display cart total in different scenarios', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Add product
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Go to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify subtotal exists
    cy.contains('Subtotal').should('be.visible');
    cy.contains('$').should('be.visible');
    
    // Verify tax calculation
    cy.contains('Tax').should('be.visible');
    
    // Verify total
    cy.contains('Total').should('be.visible');
    cy.get('[class*="text-red"]').last().should('contain', '$');
  });

  it('should handle rapid page transitions', () => {
    cy.visitApp();
    cy.wait(1000);
    
    // Rapid transitions
    cy.get('h3').first().click();
    cy.wait(500);
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    cy.get('h3').eq(1).click();
    cy.wait(500);
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    
    // Verify back on homepage
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Our Products').should('be.visible');
  });
});
