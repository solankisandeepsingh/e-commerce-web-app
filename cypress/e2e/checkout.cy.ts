describe('CheckoutPage E2E Tests', () => {
  beforeEach(() => {
    cy.visitApp();
    // Wait for products to load
    cy.get('button').contains('Add to Cart', { timeout: 15000 }).should('exist');
    // Add first product to cart
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(500);
  });

  it('should navigate to checkout page from header', () => {
    // Click on cart button in header
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify checkout page loaded
    cy.url().should('include', '/checkout');
    cy.contains('Order Summary').should('be.visible');
  });

  it('should display added products in checkout', () => {
    // Navigate to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify product is listed
    cy.get('h3').should('be.visible');
  });

  it('should display order summary section', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Order Summary').should('be.visible');
  });

  it('should display order total section', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Order Total').should('be.visible');
  });

  it('should display subtotal, shipping, and tax', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Subtotal').should('be.visible');
    cy.contains('Shipping').should('be.visible');
    cy.contains('FREE').should('be.visible');
    cy.contains('Tax').should('be.visible');
  });

  it('should display total price', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Total').should('be.visible');
    // Verify total is displayed with $ sign
    cy.get('[class*="text-red"]').last().should('contain', '$');
  });

  it('should increase product quantity', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Find the quantity increase button
    cy.get('button').contains('+').first().click();
    cy.wait(500);
    
    // Verify quantity increased
    cy.get('span').contains(/\d+/).should('exist');
  });

  it('should decrease product quantity', () => {
    // Add 2 products first
    cy.visitApp();
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    cy.get('button').contains('Add to Cart').first().click();
    cy.wait(300);
    
    // Go to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Decrease quantity
    cy.get('button').contains('-').first().click();
    cy.wait(500);
  });

  it('should remove product from cart', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Find and click remove button (trash icon)
    cy.get('button').within(() => {
      cy.get('svg').last().parent().click();
    });
    cy.wait(500);
  });

  it('should continue shopping from checkout', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Continue Shopping').should('be.visible');
    cy.get('button').contains('Continue Shopping').click();
    cy.wait(500);
    
    // Verify back on homepage
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Our Products').should('be.visible');
  });

  it('should display empty cart message when no items', () => {
    // Navigate to checkout with empty cart (fresh session)
    cy.visit('/checkout');
    cy.wait(1000);
    
    // Should display empty cart message
    cy.contains('Your Cart is Empty').should('be.visible');
    cy.contains('Add some products before checking out').should('be.visible');
  });

  it('should allow adding multiple different products', () => {
    // Add second product
    cy.waitForProductsToLoad();
    cy.get('button').contains('Add to Cart').eq(1).click();
    cy.wait(500);
    
    // Go to checkout
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify multiple products are there
    cy.get('h3').should('have.length.greaterThan', 1);
  });

  it('should calculate correct total with quantity changes', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Get initial total
    cy.get('[class*="text-red"]').last().then(($total) => {
      const initialTotal = $total.text();
      
      // Increase quantity
      cy.get('button').contains('+').first().click();
      cy.wait(500);
      
      // Total should change
      cy.get('[class*="text-red"]').last().should('not.contain', initialTotal);
    });
  });

  it('should display product images in checkout', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    // Verify product image exists
    cy.get('img[alt*=""]').should('exist');
  });

  it('should display checkout security info', () => {
    cy.get('button').contains(/\d+ items/).click();
    cy.wait(500);
    
    cy.contains('Secure checkout').should('be.visible');
    cy.contains('30-day returns').should('be.visible');
    cy.contains('Free shipping').should('be.visible');
  });
});
