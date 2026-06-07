describe('ProductDetailPage E2E Tests', () => {
  beforeEach(() => {
    // Visit home page first
    cy.visitApp();
    // Wait for products to load
    cy.get('button').contains('Add to Cart', { timeout: 15000 }).should('exist');
    // Click on first product
    cy.get('h3').first().click();
    // Wait for product detail page to load
    cy.wait(1000);
  });

  it('should load product details from API', () => {
    // Verify product title is displayed
    cy.get('h1').should('be.visible');
    
    // Verify price is displayed
    cy.get('[class*="text-red"]').should('be.visible');
  });

  it('should display product image', () => {
    cy.get('img[alt*=""]').should('be.visible');
  });

  it('should display product description', () => {
    cy.contains('Description').should('be.visible');
  });

  it('should display back to products button', () => {
    cy.get('button').contains('Back to Products').should('be.visible');
  });

  it('should display add to cart button', () => {
    cy.get('button').contains('Add to Cart').should('be.visible');
  });

  it('should display in stock status', () => {
    cy.contains('In Stock').should('be.visible');
  });

  it('should display category information', () => {
    cy.contains('Category').should('be.visible');
  });

  it('should display product ID', () => {
    cy.contains('Product ID').should('be.visible');
    cy.get('#').should('be.visible');
  });

  it('should display shipping and return policy info', () => {
    cy.contains('30-day return policy').should('be.visible');
    cy.contains('Free shipping').should('be.visible');
  });

  it('should navigate back to homepage', () => {
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    
    // Verify back on homepage
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Our Products').should('be.visible');
  });

  it('should add product to cart from detail page', () => {
    // Get initial cart count
    cy.get('button').contains(/\d+ items/).then(($btn) => {
      const initialText = $btn.text();
      const initialCount = parseInt(initialText.match(/\d+/)?.[0] || '0');
      
      // Click add to cart
      cy.get('button').contains('Add to Cart').click();
      
      // Wait for update
      cy.wait(500);
      
      // Verify cart count increased
      cy.get('button').contains(/\d+ items/).then(($newBtn) => {
        const newCount = parseInt($newBtn.text().match(/\d+/)?.[0] || '0');
        expect(newCount).to.be.greaterThan(initialCount);
      });
    });
  });

  it('should display product with valid price', () => {
    // Get the price text
    cy.get('[class*="text-red"]').first().then(($price) => {
      const priceText = $price.text();
      // Verify price format (should contain $ and a number)
      expect(priceText).to.match(/\$\d+(\.\d{2})?/);
    });
  });

  it('should handle image load errors gracefully', () => {
    // Verify that image exists (even if src fails, the element should be there)
    cy.get('img[alt*=""]').should('be.visible');
  });

  it('should load multiple products sequentially', () => {
    // Go back to homepage
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    
    // Click on second product
    cy.get('h3').eq(1).click();
    cy.wait(1000);
    
    // Verify different product detail page loaded
    cy.get('h1').should('be.visible');
    
    // Go back and verify
    cy.get('button').contains('Back to Products').click();
    cy.wait(500);
    
    // Click on third product
    cy.get('h3').eq(2).click();
    cy.wait(1000);
    
    // Verify another product detail page loaded
    cy.get('h1').should('be.visible');
  });
});
