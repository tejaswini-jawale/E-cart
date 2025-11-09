# E-Cart Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│                    (React + Vite - Port 5173)               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Header     │  │  ProductGrid │  │     Cart     │     │
│  │  Component   │  │  Component   │  │  Component   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Checkout    │  │   Receipt    │  │   Loading    │     │
│  │    Modal     │  │    Modal     │  │   Spinner    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              API Service Layer (Axios)              │    │
│  │  - productsAPI  - cartAPI  - checkoutAPI           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/REST API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                        SERVER SIDE                           │
│                  (Express.js - Port 5000)                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                 Express Middleware                  │    │
│  │  - CORS  - JSON Parser  - Request Logger           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Products   │  │     Cart     │  │   Checkout   │     │
│  │    Routes    │  │    Routes    │  │    Routes    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Product    │  │     Cart     │  │    Order     │     │
│  │    Model     │  │    Model     │  │    Model     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                       DATABASE LAYER                         │
│                  (MongoDB - Port 27017)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   products   │  │     carts    │  │    orders    │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      EXTERNAL SERVICES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Fake Store API                         │    │
│  │      https://fakestoreapi.com/products              │    │
│  │  (Product data and images - cached in MongoDB)      │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Product Loading Flow
```
User Opens App
    ↓
Frontend: App.jsx useEffect()
    ↓
API Call: productsAPI.getAll()
    ↓
Backend: GET /api/products
    ↓
Check MongoDB for cached products
    ↓
If empty → Fetch from Fake Store API
    ↓
Save to MongoDB (cache)
    ↓
Return products to frontend
    ↓
Display in ProductGrid component
```

### 2. Add to Cart Flow
```
User Clicks "Add to Cart"
    ↓
Frontend: handleAddToCart(product)
    ↓
API Call: cartAPI.addToCart(product)
    ↓
Backend: POST /api/cart
    ↓
Check if product already in cart
    ↓
If exists → Update quantity
If new → Create new cart item
    ↓
Save to MongoDB
    ↓
Return success response
    ↓
Frontend: fetchCart() to update UI
    ↓
Update cart badge and show feedback
```

### 3. Checkout Flow
```
User Fills Checkout Form
    ↓
Frontend: Form validation
    ↓
API Call: checkoutAPI.processCheckout()
    ↓
Backend: POST /api/checkout
    ↓
Validate customer data
    ↓
Calculate total
    ↓
Generate unique order number
    ↓
Create order in MongoDB
    ↓
Clear cart in MongoDB
    ↓
Return receipt data
    ↓
Frontend: Display receipt modal
    ↓
Update cart UI (empty)
```

## Component Hierarchy

```
App.jsx (Root Component)
│
├── Header.jsx
│   └── Cart Button (with badge)
│
├── ErrorMessage.jsx (conditional)
│
├── LoadingSpinner.jsx (conditional)
│
├── ProductGrid.jsx
│   └── ProductCard.jsx (multiple instances)
│       ├── Product Image
│       ├── Product Info
│       └── Add to Cart Button
│
├── Cart.jsx (conditional - sidebar)
│   ├── Cart Header
│   ├── CartItem.jsx (multiple instances)
│   │   ├── Item Image
│   │   ├── Item Details
│   │   ├── Quantity Controls
│   │   └── Remove Button
│   └── Cart Footer
│       ├── Total Display
│       └── Checkout Button
│
├── CheckoutModal.jsx (conditional)
│   ├── Order Summary
│   ├── Customer Form
│   │   ├── Name Input
│   │   └── Email Input
│   └── Form Actions
│
└── ReceiptModal.jsx (conditional)
    ├── Success Icon
    ├── Order Information
    ├── Customer Information
    ├── Order Items List
    ├── Total Display
    └── Action Buttons
```

## API Endpoints

### Products API
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/products` | Get all products | - | Array of products |
| GET | `/api/products/:id` | Get single product | - | Product object |

### Cart API
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/cart` | Get cart with total | - | Cart object with items, total, itemCount |
| POST | `/api/cart` | Add item to cart | `{productId, title, price, image, quantity}` | Success message with item |
| PUT | `/api/cart/:id` | Update item quantity | `{quantity}` | Updated item |
| DELETE | `/api/cart/:id` | Remove item | - | Success message |
| DELETE | `/api/cart` | Clear cart | - | Success message |

### Checkout API
| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/checkout` | Process order | `{customerName, customerEmail, cartItems}` | Receipt object |
| GET | `/api/checkout/orders` | Get all orders | - | Array of orders |
| GET | `/api/checkout/orders/:orderNumber` | Get specific order | - | Order object |

## Database Schema

### Product Schema
```javascript
{
  id: Number (unique, required),
  title: String (required),
  price: Number (required),
  description: String (required),
  category: String (required),
  image: String (required),
  rating: {
    rate: Number,
    count: Number
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Cart Schema
```javascript
{
  productId: Number (required),
  title: String (required),
  price: Number (required),
  image: String (required),
  quantity: Number (required, min: 1, default: 1),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Order Schema
```javascript
{
  customerName: String (required),
  customerEmail: String (required),
  items: [{
    productId: Number,
    title: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number (required),
  orderNumber: String (required, unique),
  status: String (default: 'completed'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## State Management

### App-Level State (App.jsx)
```javascript
{
  products: [],              // Array of all products
  cart: {                    // Cart object
    items: [],               // Array of cart items
    total: 0,                // Total price
    itemCount: 0             // Total item count
  },
  showCart: false,           // Cart sidebar visibility
  showCheckout: false,       // Checkout modal visibility
  receipt: null,             // Receipt data (or null)
  loading: true,             // Loading state
  error: null                // Error message (or null)
}
```

## Technology Stack Details

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.2",
  "@vitejs/plugin-react": "^4.2.1",
  "vite": "^5.0.8"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "axios": "^1.6.2",
  "nodemon": "^3.0.2",
  "concurrently": "^8.2.2"
}
```

## Environment Configuration

### Development
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecart
NODE_ENV=development
```

### Production (Example)
```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecart
NODE_ENV=production
```

## File Structure

```
ecart/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductGrid.css
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCard.css
│   │   │   ├── Cart.jsx
│   │   │   ├── Cart.css
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartItem.css
│   │   │   ├── CheckoutModal.jsx
│   │   │   ├── CheckoutModal.css
│   │   │   ├── ReceiptModal.jsx
│   │   │   ├── ReceiptModal.css
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── LoadingSpinner.css
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ErrorMessage.css
│   │   ├── services/                # API services
│   │   │   └── api.js
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend application
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── models/
│   │   ├── Product.js               # Product model
│   │   ├── Cart.js                  # Cart model
│   │   └── Order.js                 # Order model
│   ├── routes/
│   │   ├── products.js              # Product routes
│   │   ├── cart.js                  # Cart routes
│   │   └── checkout.js              # Checkout routes
│   └── index.js                     # Server entry point
│
├── .env                             # Environment variables
├── .gitignore
├── package.json                     # Root package.json
├── README.md                        # Project overview
├── SETUP_GUIDE.md                   # Setup instructions
├── TESTING.md                       # Testing guide
├── FEATURES.md                      # Feature documentation
└── ARCHITECTURE.md                  # This file
```

## Security Considerations

### Implemented
- Input validation on all API endpoints
- Email format validation
- CORS configuration
- Environment variables for sensitive data
- Error messages don't expose system details

### Recommended for Production
- HTTPS/SSL encryption
- Rate limiting
- Input sanitization
- JWT authentication
- Session management
- CSRF protection
- SQL injection prevention (using Mongoose)
- XSS prevention
- Password hashing (if user auth added)

## Performance Optimizations

### Frontend
- Lazy loading images
- Component memoization opportunities
- Code splitting potential
- CSS animations use GPU acceleration
- Efficient re-renders

### Backend
- Database connection pooling
- Product caching in MongoDB
- Async/await for non-blocking operations
- Indexed database fields

### Database
- Unique indexes on id fields
- Compound indexes potential
- Query optimization

## Scalability Considerations

### Current Architecture
- Monolithic application
- Single database instance
- Suitable for small to medium traffic

### Future Scaling Options
1. **Horizontal Scaling**: Multiple server instances with load balancer
2. **Database Sharding**: Distribute data across multiple MongoDB instances
3. **Caching Layer**: Redis for session and cart data
4. **CDN**: Static asset delivery
5. **Microservices**: Separate services for products, cart, orders
6. **Message Queue**: RabbitMQ/Kafka for async operations
7. **Container Orchestration**: Docker + Kubernetes

## Deployment Architecture (Recommended)

```
┌─────────────────────────────────────────┐
│           Load Balancer (Nginx)         │
└────────────┬────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
┌───▼────┐      ┌────▼───┐
│ Server │      │ Server │
│ Node 1 │      │ Node 2 │
└───┬────┘      └────┬───┘
    │                │
    └────────┬───────┘
             │
    ┌────────▼────────┐
    │  MongoDB Cluster │
    │  (Replica Set)   │
    └──────────────────┘
```

## Monitoring & Logging (Future)

### Recommended Tools
- **Application Monitoring**: New Relic, Datadog
- **Error Tracking**: Sentry
- **Logging**: Winston, Morgan
- **Analytics**: Google Analytics, Mixpanel
- **Uptime Monitoring**: Pingdom, UptimeRobot

## Conclusion

This architecture provides a solid foundation for an e-commerce shopping cart application with clear separation of concerns, scalable design patterns, and modern web development practices.

