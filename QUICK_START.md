# E-Cart Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (2 minutes)
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Start MongoDB (30 seconds)
```bash
# Option 1: Local MongoDB
mongod

# Option 2: Use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file with your Atlas connection string
```

### Step 3: Run the Application (30 seconds)
```bash
# Run both frontend and backend
npm run dev
```

### Step 4: Open in Browser (10 seconds)
Navigate to: **http://localhost:5173**

---

## 🎯 What You'll See

1. **Product Grid** - 10 products with images loaded from Fake Store API
2. **Add to Cart** - Click any "Add to Cart" button
3. **Cart Badge** - See the cart icon update with item count
4. **View Cart** - Click the cart button to see your items
5. **Checkout** - Fill in name and email, submit to get a receipt

---

## 📝 Quick Commands

```bash
# Install all dependencies (backend + frontend)
npm run install-all

# Run both servers concurrently
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build frontend for production
cd client && npm run build

# Start production server
npm start
```

---

## 🔧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or update .env with MongoDB Atlas URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecart
```

### Port Already in Use
```bash
# Change port in .env file
PORT=5001
```

### Products Not Loading
- Check internet connection (needed for Fake Store API)
- Verify backend is running on http://localhost:5000
- Check browser console for errors

---

## 📂 Project Files

### Frontend (client/)
- `src/App.jsx` - Main application component
- `src/components/` - 9 React components
- `src/services/api.js` - API service layer

### Backend (server/)
- `index.js` - Express server
- `models/` - MongoDB schemas
- `routes/` - API endpoints

### Configuration
- `.env` - Environment variables
- `package.json` - Dependencies

---

## 🎨 Features to Test

✅ Browse products  
✅ Add items to cart  
✅ Update quantities  
✅ Remove items  
✅ Checkout with form  
✅ View receipt  
✅ Responsive design (resize browser)  

---

## 📚 Documentation

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **TESTING.md** - Testing guide
- **FEATURES.md** - Feature documentation
- **ARCHITECTURE.md** - System architecture
- **PROJECT_SUMMARY.md** - Complete summary

---

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Products**: http://localhost:5000/api/products
- **Cart**: http://localhost:5000/api/cart

---

## 🎯 Test the API

```bash
# Get all products
curl http://localhost:5000/api/products

# Get cart
curl http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"title":"Test","price":29.99,"image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","quantity":1}'
```

---

## 💡 Tips

1. **First Load**: Products fetch from Fake Store API (may take 2-3 seconds)
2. **Subsequent Loads**: Products load from MongoDB (much faster)
3. **Cart Persistence**: Cart items saved in database
4. **Order History**: Check MongoDB orders collection for all orders
5. **Responsive**: Try resizing browser or use mobile device

---

## 🎓 What's Included

✅ Full-stack application (React + Node.js + MongoDB)  
✅ 10 products with real images  
✅ Complete shopping cart functionality  
✅ Checkout with validation  
✅ Receipt generation  
✅ Responsive design  
✅ Error handling  
✅ Professional UI  
✅ Database persistence  
✅ Comprehensive documentation  

---

## 🚀 Next Steps

1. ✅ Run the application
2. ✅ Test all features
3. ✅ Review the code
4. ✅ Check the database
5. ✅ Read the documentation
6. ✅ Deploy to production (optional)

---

## 📞 Need Help?

Check these files:
- **SETUP_GUIDE.md** - Detailed setup help
- **TESTING.md** - Testing instructions
- **ARCHITECTURE.md** - How it works

---

**That's it! You're ready to go! 🎉**

Happy coding! 🚀

