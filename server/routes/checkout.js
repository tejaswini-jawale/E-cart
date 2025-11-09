import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const router = express.Router();

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems } = req.body;
    
    if (!customerName || !customerEmail) {
      return res.status(400).json({ 
        message: 'Customer name and email are required' 
      });
    }
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ 
        message: 'Cart is empty' 
      });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ 
        message: 'Invalid email address' 
      });
    }
    
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    const order = new Order({
      customerName,
      customerEmail,
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      orderNumber: generateOrderNumber()
    });
    
    await order.save();
    
    await Cart.deleteMany({});
    
    res.status(201).json({
      message: 'Order placed successfully',
      receipt: {
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        total: order.total,
        timestamp: order.createdAt,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error processing checkout:', error.message);
    res.status(500).json({ 
      message: 'Error processing checkout', 
      error: error.message 
    });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ 
      message: 'Error fetching orders', 
      error: error.message 
    });
  }
});

router.get('/orders/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error.message);
    res.status(500).json({ 
      message: 'Error fetching order', 
      error: error.message 
    });
  }
});

export default router;

