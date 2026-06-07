describe('HomePage E2E Tests', () => {
  beforeEach(() => {
    cy.visitApp();
    // Wait for products to load from API
    cy.get('div', { timeout: 15000 }).should('exist');
  });

  it('should load and display products from API', () => {
    cy.contains('Our Products').should('be.visible');
    // Check if product grid exists
    cy.get('[class*="grid"]').should('exist');
    // Verify at least one product is displayed
    cy.get('button').contains('Add to Cart').first().should('be.visible');
  });

  it('should display search input field', () => {
    cy.get('input[placeholder="Search products..."]').should('be.visible');
  });

  it('should display sort dropdown', () => {
    cy.get('select').should('be.visible');
    cy.get('select').within(() => {
      cy.get('option').should('have.length', 3);
      cy.contains('Sort By').should('be.visible');
      cy.contains('Price Low To High').should('be.visible');
      cy.contains('Price High To Low').should('be.visible');
    });
  });

  it('should filter products by search query', () => {
    // Type in search box
    cy.get('input[placeholder="Search products..."]').type('Wireless');
    
    // Wait for API call to complete
    cy.wait(1500);
    
    // Verify search results are displayed
    cy.get('button').contains('Add to Cart').should('exist');
  });

  it('should sort products by price ascending', () => {
    cy.get('select').select('price_asc');
    
    // Wait for sorting to apply
    cy.wait(500);
    
    // Verify products are still displayed
    cy.get('button').contains('Add to Cart').should('be.visible');
  });

  it('should sort products by price descending', () => {
    cy.get('select').select('price_desc');
    
    // Wait for sorting to apply
    cy.wait(500);
    
    // Verify products are still displayed
    cy.get('button').contains('Add to Cart').should('be.visible');
  });

  it('should display clear search button when no results found', () => {
    // Search for a product that likely won't exist
    cy.get('input[placeholder="Search products..."]').type('NONEXISTENTPRODUCT12345');
    
    // Wait for search results
    cy.wait(1500);
    
    // Check for "No Products Found" or similar message
    // This depends on how the app handles no results
    cy.get('button').contains('Clear Search').should('be.visible');
  });

  it('should navigate to product detail page when clicking on product', () => {
    // Click first product title
    cy.get('h3').first().click();
    
    // Verify navigation to product detail page
    cy.url().should('include', '/product/');
    cy.url().should('include', '/details');
  });

  it('should add product to cart from homepage', () => {
    // Get initial cart count
    cy.get('button').contains(/\d+ items/).then(($btn) => {
      const initialCount = $btn.text();
      
      // Click add to cart
      cy.get('button').contains('Add to Cart').first().click();
      
      // Wait for cart to update
      cy.wait(500);
      
      // Verify cart count increased
      cy.get('button').contains(/\d+ items/).should('not.contain', initialCount);
    });
  });

  it('should persist search query in URL', () => {
    cy.get('input[placeholder="Search products..."]').type('Keyboard');
    cy.wait(1000);
    
    // Check URL for search parameter
    cy.url().should('include', 'search=Keyboard');
  });

  it('should persist sort query in URL', () => {
    cy.get('select').select('price_asc');
    cy.wait(500);
    
    // Check URL for sort parameter
    cy.url().should('include', 'sort=price_asc');
  });
});
