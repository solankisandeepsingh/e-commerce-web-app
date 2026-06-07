# E-Commerce Store with React Context API

A modern e-commerce application built with **React**, **React Context API**, and **React Router v6**. The app demonstrates state management using Context API with localStorage persistence for cart functionality.

## Features

✨ **Product Catalog**
- Display grid of 8 products with images, titles, descriptions, and prices
- Responsive layout that works on desktop, tablet, and mobile devices
- Clean, modern UI with hover effects and smooth transitions

🛒 **Shopping Cart (Context API)**
- Add products to cart with Context API state management
- Persist cart data to localStorage for data retention
- Display total items and total price in real-time
- Support for multiple quantities of the same item

📱 **Product Details Page**
- Dynamic routing with React Router v6 (`/product/:id/details`)
- Full product information including description and category
- Back navigation to product list
- Add to cart from detail page

💾 **Data Persistence**
- Cart state saved to localStorage
- Survives browser refresh and reload
- Automatic synchronization across components

🎨 **Responsive Design**
- Mobile-first approach
- Works seamlessly on all screen sizes
- Inline styling with CSS-in-JS for consistency

## Technology Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **React Context API** - State management
- **Lucide React** - Icon library
- **Create React App** - Build tool
- **JavaScript ES6+** - Modern JavaScript

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Header with cart count
│   └── Footer.jsx        # Footer with cart summary
├── context/
│   └── CartContext.jsx   # Context for cart management
├── data/
│   └── mockProducts.js   # Mock product data
├── pages/
│   ├── HomePage.jsx      # Product grid page
│   └── ProductDetailPage.jsx  # Product details page
├── App.jsx               # Main app with routing
├── index.jsx             # React entry point
├── index.css             # Global styles
└── setupProxy.js         # API proxy configuration

public/
└── index.html            # HTML template
```

## Getting Started

### Prerequisites
- Node.js 14.0 or higher
- npm

### Installation

```bash
# Clone or download the project
cd v0-project

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Usage

### Adding Products to Cart
1. Browse the product grid on the home page
2. Click **"Add to Cart"** button on any product card
3. View the updated item count in the header

### Viewing Product Details
1. Click on a product image or title
2. View full product information
3. Click **"Back to Products"** to return to the grid

### End-to-End Testing
This project currently does not include automated Playwright or Cypress end-to-end tests.

If you want to add E2E testing later, I can help set up a clean Cypress or Playwright workflow.

### Cart Persistence
- Cart data is automatically saved to browser localStorage
- Reload the page to verify cart data persists
- Clear browser data to reset the cart

## Component Architecture

### CartContext
Provides global state management for:
- `cartItems` - Array of items in cart
- `addToCart(product)` - Function to add items
- `getTotalItems()` - Calculate total quantity
- `getTotalPrice()` - Calculate total price

### Header Component
- Displays store branding
- Shows current cart item count
- Updates in real-time as items are added

### Footer Component
- Displays cart summary (total items and price)
- Shows message when cart is empty
- Always visible at bottom of page

## Features Implemented

✅ Product grid with responsive layout
✅ Product detail page with dynamic routing
✅ React Context API for state management
✅ localStorage persistence for cart data
✅ Add to cart functionality
✅ Real-time cart updates
✅ Back navigation from detail page
✅ Mobile responsive design
✅ Smooth animations and transitions
✅ Clean, modern UI

## Future Enhancements

- Remove item from cart functionality
- Quantity adjustment
- Search and filter products
- Checkout page
- Product reviews and ratings
- Wishlist feature
- User authentication
- Payment integration

## Notes

- Mock product data is used instead of API calls
- All prices are in USD
- Cart persists across browser sessions using localStorage
- No backend server required - fully client-side application

## License

Open source - feel free to use and modify!
