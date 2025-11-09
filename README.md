# E-Cart - Full Stack Shopping Cart Application

A modern, responsive e-commerce shopping cart application with React frontend and Node.js backend.

![E-Cart](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-ISC-blue.svg)

## Features

- 🛍️ Browse products from Fake Store API
- 🛒 Add/Remove items from shopping cart
- 📊 Real-time cart total calculation
- ✅ Checkout process with form validation
- 🧾 Order receipt generation
- 💾 MongoDB database persistence
- 📱 Fully responsive design
- ⚡ Fast and optimized performance

## Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Axios (HTTP client)
- CSS3 (Modern responsive design)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- REST API architecture

## Project Structure

```
ecart/
├── backend/              # Backend API server
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── index.js         # Server entry point
│   ├── package.json     # Backend dependencies
│   └── .env             # Environment variables
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   ├── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
│
└── package.json         # Root package.json for scripts
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/tejaswini-jawale/ecart.git
cd ecart
```

### Step 2: Install Dependencies

Install all dependencies (backend + frontend):

```bash
npm run install:all
```

Or install separately:

```bash
npm run install:backend
npm run install:frontend
```

### Step 3: Configure Environment Variables

#### Backend Configuration

Navigate to `backend` folder and update `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/ecart
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas (cloud):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecart
PORT=5000
NODE_ENV=development
```

#### Frontend Configuration

Navigate to `frontend` folder and update `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start MongoDB

**Option A - Local MongoDB:**
```bash
net start MongoDB
```

**Option B - MongoDB Atlas:**
Use the connection string from your Atlas cluster.

### Step 5: Run the Application

**Development Mode (Both servers):**
```bash
npm run dev
```

This runs:
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

**Run Separately:**
```bash
npm run dev:backend
npm run dev:frontend
```

**Production Mode:**
```bash
npm run build
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout
- `POST /api/checkout` - Process checkout
- `GET /api/checkout/orders` - Get all orders
- `GET /api/checkout/orders/:orderNumber` - Get specific order

### Health
- `GET /api/health` - API health check

## Usage

1. Browse products on the home page
2. Click "Add to Cart" on any product
3. View cart by clicking the cart icon in header
4. Update quantities or remove items in cart
5. Click "Proceed to Checkout"
6. Fill in customer details
7. Place order and view receipt

## Database Schema

### Product Model
```javascript
{
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number }
}
```

### Cart Model
```javascript
{
  productId: Number,
  title: String,
  price: Number,
  image: String,
  quantity: Number
}
```

### Order Model
```javascript
{
  customerName: String,
  customerEmail: String,
  items: Array,
  total: Number,
  orderNumber: String,
  status: String,
  createdAt: Date
}
```

## Features Explained

### Frontend Features
- **Product Grid**: Displays products in responsive grid layout
- **Shopping Cart**: Slide-in cart with real-time updates
- **Checkout Modal**: Form validation and order processing
- **Receipt Modal**: Order confirmation with print option
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

### Backend Features
- **RESTful API**: Clean and consistent API design
- **Data Validation**: Input validation on all endpoints
- **Error Handling**: Comprehensive error handling
- **Database Caching**: Products cached from external API
- **CORS Enabled**: Cross-origin resource sharing
- **Order Management**: Order tracking with unique order numbers

## Troubleshooting

### Port Already in Use
```bash
taskkill /F /IM node.exe
```

### MongoDB Connection Failed
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify MongoDB is installed and accessible

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

## Screenshots

### Home Page
Products displayed in responsive grid layout with add-to-cart functionality.

### Shopping Cart
Slide-in cart sidebar showing selected items, quantities, and total price.

### Checkout
Modal form for customer information with validation.

### Receipt
Order confirmation with order number and order details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

GitHub: [@tejaswini-jawale](https://github.com/tejaswini-jawale)

Repository: [https://github.com/tejaswini-jawale/ecart](https://github.com/tejaswini-jawale/ecart)

---

Made with ❤️ using React & Node.js
