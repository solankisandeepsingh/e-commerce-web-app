# E2E Testing Setup with Cypress

This project uses **Cypress** for End-to-End (E2E) testing to validate the e-commerce application's functionality against the real API.

## Installation

Cypress has already been installed. All E2E test files are located in the `cypress/e2e/` directory.

## Test Files

### 1. **homepage.cy.ts** - Homepage Tests
Tests for the main product listing page:
- Product loading from API
- Search functionality
- Sort functionality (price ascending/descending)
- Product filtering
- Navigation to product details
- Add to cart functionality
- URL parameter persistence

### 2. **product-detail.cy.ts** - Product Detail Page Tests
Tests for individual product detail pages:
- Loading product details from API
- Displaying product information (price, description, category)
- Image handling
- Back navigation
- Add to cart from detail page
- Sequential product navigation

### 3. **checkout.cy.ts** - Checkout Page Tests
Tests for the shopping cart and checkout:
- Navigating to checkout
- Displaying cart items
- Order summary display
- Total calculation (subtotal, tax, shipping)
- Quantity adjustment
- Product removal
- Empty cart handling
- Multiple product management
- Security information display

### 4. **header.cy.ts** - Header Component Tests
Tests for the header navigation:
- Logo display
- Shopping cart counter
- Cart counter updates
- Navigation from header
- Sticky header behavior
- Cart persistence across pages

### 5. **app-flow.cy.ts** - Full Application Flow Tests
End-to-end user journey tests:
- Complete browse → search → add → checkout flow
- Complete browse → detail → add → checkout flow
- Sorting with multiple products
- Search + sort combination
- Multi-page navigation without losing cart
- Rapid page transitions
- Complex cart interactions

## Running Tests

### Interactive Mode (Cypress UI)
Opens the Cypress test runner where you can see tests run in real-time:
```bash
npm run cypress:open
```

### Headless Mode
Runs all tests in the terminal without opening a browser:
```bash
npm run cypress:run
```

### Headless Mode with Browser View
Runs tests in headless mode but shows the browser interaction:
```bash
npm run cypress:run:headed
```

### Full E2E (Starts server + runs tests)
Automatically starts the dev server and runs all tests:
```bash
npm run e2e
```

## Test Configuration

The Cypress configuration is defined in `cypress.config.ts` with the following settings:

- **Base URL**: `http://localhost:3000`
- **Viewport**: 1280x720
- **Command Timeout**: 10 seconds
- **Request Timeout**: 10 seconds

## Key Testing Patterns

### API Data Fetching
All tests use the real API endpoints:
- Products API: `https://api.escuelajs.co/api/v1/products`
- No mock data is used - tests validate actual API integration

### Wait Times
Strategic wait times are used to account for:
- API response times
- DOM rendering
- Debounced search (500ms)
- Component updates

### Assertions
Tests verify:
- Element visibility
- URL patterns
- Text content
- DOM structure
- User interactions

## Custom Commands

The following custom Cypress commands are available:

```typescript
cy.visitApp() // Visits the homepage and waits for loading
cy.waitForProductsToLoad() // Waits for products to appear in the DOM
```

## Expected Test Results

When running the test suite, you should see:
- ✅ All homepage tests passing (10 tests)
- ✅ All product detail tests passing (11 tests)
- ✅ All checkout tests passing (13 tests)
- ✅ All header tests passing (11 tests)
- ✅ All app flow tests passing (9 tests)
- ✅ **Total: ~54 test cases**

## Troubleshooting

### Tests timing out
- Ensure the dev server is running: `npm start`
- Check internet connection (API calls are required)
- Increase timeout values in `cypress.config.ts` if API is slow

### API failures
- Verify the API endpoint is accessible
- Check network connectivity
- The test suite requires internet access for API calls

### Element not found errors
- Wait times may need adjustment for slower machines
- Check that selectors match the current DOM structure
- Review browser console for errors

## CI/CD Integration

To run tests in a CI/CD pipeline:

```bash
npm run e2e
```

This command:
1. Starts the dev server
2. Waits for server to be ready
3. Runs all Cypress tests
4. Exits with appropriate exit code

## Notes

- Tests use real API data, so results may vary based on available products
- Tests do not modify server data (read-only operations)
- Cart data is stored in localStorage and persists during test sessions
- All tests are independent and can run in any order
