# E-Cart Setup Guide

This guide will help you set up and run the E-Cart application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB**
   - Option 1: Install locally from https://www.mongodb.com/try/download/community
   - Option 2: Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify installation: `mongod --version`

3. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

## Installation Steps

### Step 1: Install Dependencies

Open your terminal in the project root directory (`d:\ecart`) and run:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Configure Environment Variables

The `.env` file is already created in the root directory with default settings:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecart
NODE_ENV=development
```

**If using MongoDB Atlas (cloud):**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecart
   ```

### Step 3: Start MongoDB (if using local installation)

Open a new terminal window and run:

```bash
mongod
```

Keep this terminal window open while running the application.

### Step 4: Run the Application

#### Option 1: Run Both Frontend and Backend Together (Recommended)

```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:5173

#### Option 2: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

### Step 5: Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

## Testing the Application

### 1. View Products
- The home page will automatically fetch and display products from the Fake Store API
- Products are cached in MongoDB for faster subsequent loads

### 2. Add to Cart
- Click "Add to Cart" on any product
- The cart badge in the header will update

### 3. View Cart
- Click the cart button in the header
- View all items, update quantities, or remove items

### 4. Checkout
- Click "Proceed to Checkout" in the cart
- Fill in your name and email
- Click "Place Order"
- View your receipt with order number

### 5. Test API Endpoints

You can test the API using tools like Postman or curl:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get cart
curl http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"title":"Test Product","price":29.99,"image":"https://example.com/image.jpg","quantity":1}'

# Get all orders
curl http://localhost:5000/api/checkout/orders
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Check if MongoDB is running on the correct port (27017)
3. Verify `MONGODB_URI` in `.env` file

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
1. Change the port in `.env` file
2. Or kill the process using the port:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -ti:5000 | xargs kill`

### Products Not Loading

**Solution:**
1. Check your internet connection (needed for Fake Store API)
2. Check browser console for errors
3. Verify backend is running on http://localhost:5000
4. Check MongoDB connection

### CORS Errors

**Solution:**
- The backend is already configured with CORS
- Make sure you're accessing the frontend through http://localhost:5173
- Clear browser cache and reload

## Building for Production

### Build Frontend

```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Run Production Server

```bash
npm start
```

## Project Structure

```
ecart/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
├── server/                # Express backend
│   ├── config/           # Database configuration
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
├── .env                  # Environment variables
├── package.json          # Backend dependencies
└── README.md            # Project documentation
```

## Features Implemented

✅ Product catalog with images from Fake Store API  
✅ Add/Remove items from cart  
✅ Update cart item quantities  
✅ Real-time cart total calculation  
✅ Mock checkout with form validation  
✅ Receipt generation with order number  
✅ MongoDB database persistence  
✅ Responsive design (mobile-friendly)  
✅ Error handling and validation  
✅ Loading states and user feedback  
✅ Professional UI with animations  

## Support

If you encounter any issues:

1. Check this guide's troubleshooting section
2. Verify all prerequisites are installed correctly
3. Check the console logs for error messages
4. Ensure all dependencies are installed: `npm install`

## Next Steps

- Explore the codebase
- Test all features
- Review the API endpoints
- Check the database collections in MongoDB
- Customize the styling if needed

Happy coding! 🚀

