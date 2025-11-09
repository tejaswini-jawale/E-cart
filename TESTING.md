# E-Cart Testing Guide

This document provides comprehensive testing instructions for the E-Cart application.

## Manual Testing Checklist

### 1. Product Display Tests

#### Test 1.1: Load Products
- [ ] Navigate to http://localhost:5173
- [ ] Verify loading spinner appears
- [ ] Verify 10 products are displayed in a grid
- [ ] Verify each product shows:
  - Product image
  - Product title
  - Product description (truncated)
  - Price
  - Rating
  - "Add to Cart" button

#### Test 1.2: Product Images
- [ ] Verify all product images load correctly
- [ ] Verify images are properly sized and centered
- [ ] Verify hover effect on product cards

#### Test 1.3: Responsive Design
- [ ] Resize browser to mobile width (< 480px)
- [ ] Verify products display in single column
- [ ] Resize to tablet width (480px - 768px)
- [ ] Verify products display in appropriate grid
- [ ] Resize to desktop width (> 768px)
- [ ] Verify products display in multi-column grid

### 2. Cart Functionality Tests

#### Test 2.1: Add to Cart
- [ ] Click "Add to Cart" on a product
- [ ] Verify button changes to "✓ Added!" with green background
- [ ] Verify cart badge appears in header with count "1"
- [ ] Add same product again
- [ ] Verify cart badge updates to "2"
- [ ] Add different product
- [ ] Verify cart badge shows total item count

#### Test 2.2: View Cart
- [ ] Click cart button in header
- [ ] Verify cart sidebar slides in from right
- [ ] Verify all added items are displayed
- [ ] Verify each item shows:
  - Product image
  - Product title
  - Price
  - Quantity controls
  - Remove button
  - Subtotal
- [ ] Verify total amount is calculated correctly

#### Test 2.3: Update Quantity
- [ ] In cart, click "+" button on an item
- [ ] Verify quantity increases
- [ ] Verify subtotal updates
- [ ] Verify total updates
- [ ] Click "-" button
- [ ] Verify quantity decreases
- [ ] Verify "-" button is disabled when quantity is 1

#### Test 2.4: Remove Item
- [ ] Click "Remove" button on an item
- [ ] Verify item is removed from cart
- [ ] Verify total updates
- [ ] Verify cart badge updates
- [ ] Remove all items
- [ ] Verify "Your cart is empty" message appears

#### Test 2.5: Empty Cart State
- [ ] Open cart when empty
- [ ] Verify empty cart icon and message
- [ ] Verify "Continue Shopping" button
- [ ] Click "Continue Shopping"
- [ ] Verify cart closes

### 3. Checkout Flow Tests

#### Test 3.1: Proceed to Checkout
- [ ] Add items to cart
- [ ] Click "Proceed to Checkout"
- [ ] Verify checkout modal appears
- [ ] Verify order summary shows all items
- [ ] Verify total is correct

#### Test 3.2: Form Validation
- [ ] Click "Place Order" with empty form
- [ ] Verify name error: "Name is required"
- [ ] Verify email error: "Email is required"
- [ ] Enter single character in name
- [ ] Verify error: "Name must be at least 2 characters"
- [ ] Enter invalid email (e.g., "test")
- [ ] Verify error: "Please enter a valid email address"
- [ ] Enter invalid email (e.g., "test@")
- [ ] Verify error: "Please enter a valid email address"

#### Test 3.3: Successful Checkout
- [ ] Enter valid name (e.g., "John Doe")
- [ ] Enter valid email (e.g., "john@example.com")
- [ ] Click "Place Order"
- [ ] Verify button shows "Processing..."
- [ ] Verify receipt modal appears
- [ ] Verify success icon (green checkmark)
- [ ] Verify "Thank you for your order!" message

#### Test 3.4: Receipt Details
- [ ] Verify receipt shows:
  - Order number (format: ORD-timestamp-random)
  - Date and time
  - Status: "completed"
  - Customer name
  - Customer email
  - All ordered items with quantities
  - Total amount
- [ ] Verify "Print Receipt" button exists
- [ ] Verify "Continue Shopping" button exists

#### Test 3.5: Post-Checkout State
- [ ] Close receipt modal
- [ ] Open cart
- [ ] Verify cart is empty
- [ ] Verify cart badge is removed from header

### 4. Error Handling Tests

#### Test 4.1: Network Errors
- [ ] Stop the backend server
- [ ] Try to add item to cart
- [ ] Verify error message appears
- [ ] Restart backend server
- [ ] Verify functionality resumes

#### Test 4.2: API Errors
- [ ] Test with invalid data
- [ ] Verify appropriate error messages

### 5. UI/UX Tests

#### Test 5.1: Animations
- [ ] Verify smooth transitions when:
  - Opening/closing cart
  - Opening/closing modals
  - Hovering over products
  - Adding items to cart

#### Test 5.2: Loading States
- [ ] Verify loading spinner on initial page load
- [ ] Verify "Processing..." state during checkout

#### Test 5.3: Accessibility
- [ ] Tab through all interactive elements
- [ ] Verify focus states are visible
- [ ] Verify buttons have appropriate hover states

### 6. Database Persistence Tests

#### Test 6.1: Product Caching
- [ ] First load: Products fetched from Fake Store API
- [ ] Refresh page
- [ ] Verify products load faster (from MongoDB)
- [ ] Check MongoDB database for products collection

#### Test 6.2: Cart Persistence
- [ ] Add items to cart
- [ ] Check MongoDB for cart collection
- [ ] Verify cart items are stored

#### Test 6.3: Order Storage
- [ ] Complete a checkout
- [ ] Check MongoDB for orders collection
- [ ] Verify order details are stored correctly

## API Testing

### Using curl

#### Get All Products
```bash
curl http://localhost:5000/api/products
```
Expected: Array of 10 products

#### Get Cart
```bash
curl http://localhost:5000/api/cart
```
Expected: Cart object with items, total, and itemCount

#### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "title": "Test Product",
    "price": 29.99,
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "quantity": 1
  }'
```
Expected: Success message with cart item

#### Update Cart Item
```bash
curl -X PUT http://localhost:5000/api/cart/{ITEM_ID} \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'
```
Expected: Updated cart item

#### Remove from Cart
```bash
curl -X DELETE http://localhost:5000/api/cart/{ITEM_ID}
```
Expected: Success message

#### Checkout
```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "cartItems": [
      {
        "productId": 1,
        "title": "Test Product",
        "price": 29.99,
        "quantity": 2,
        "image": "https://example.com/image.jpg"
      }
    ]
  }'
```
Expected: Receipt object with order details

#### Get All Orders
```bash
curl http://localhost:5000/api/checkout/orders
```
Expected: Array of all orders

### Using Postman

1. Import the following endpoints:
   - GET http://localhost:5000/api/products
   - GET http://localhost:5000/api/cart
   - POST http://localhost:5000/api/cart
   - PUT http://localhost:5000/api/cart/:id
   - DELETE http://localhost:5000/api/cart/:id
   - POST http://localhost:5000/api/checkout
   - GET http://localhost:5000/api/checkout/orders

2. Test each endpoint with various inputs
3. Verify response status codes and data

## MongoDB Testing

### Using MongoDB Compass

1. Connect to: `mongodb://localhost:27017`
2. Select database: `ecart`
3. Verify collections:
   - `products` - Should contain 10 products
   - `carts` - Should contain current cart items
   - `orders` - Should contain completed orders

### Using MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Switch to ecart database
use ecart

# View all products
db.products.find().pretty()

# View cart items
db.carts.find().pretty()

# View orders
db.orders.find().pretty()

# Count documents
db.products.countDocuments()
db.carts.countDocuments()
db.orders.countDocuments()

# Clear cart (for testing)
db.carts.deleteMany({})

# Clear orders (for testing)
db.orders.deleteMany({})
```

## Performance Testing

### Load Time
- [ ] Measure initial page load time
- [ ] Should be < 3 seconds on first load
- [ ] Should be < 1 second on subsequent loads

### API Response Time
- [ ] GET /api/products: < 500ms
- [ ] GET /api/cart: < 200ms
- [ ] POST /api/cart: < 300ms
- [ ] POST /api/checkout: < 500ms

## Browser Compatibility

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Test Results Template

```
Test Date: ___________
Tester: ___________

Product Display: ☐ Pass ☐ Fail
Cart Functionality: ☐ Pass ☐ Fail
Checkout Flow: ☐ Pass ☐ Fail
Error Handling: ☐ Pass ☐ Fail
UI/UX: ☐ Pass ☐ Fail
Database Persistence: ☐ Pass ☐ Fail
API Endpoints: ☐ Pass ☐ Fail
Performance: ☐ Pass ☐ Fail
Browser Compatibility: ☐ Pass ☐ Fail

Notes:
_________________________________
_________________________________
_________________________________
```

## Known Issues

None at this time.

## Future Test Cases

- User authentication
- Multiple user carts
- Payment integration
- Inventory management
- Order history
- Product search and filtering
- Product categories

