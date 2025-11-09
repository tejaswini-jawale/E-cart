import express from 'express';
import Cart from '../models/Cart.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.find({});
    
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    res.json({
      items: cartItems,
      total: parseFloat(total.toFixed(2)),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ 
      message: 'Error fetching cart', 
      error: error.message 
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { productId, title, price, image, quantity } = req.body;
    
    if (!productId || !title || !price || !image) {
      return res.status(400).json({ 
        message: 'Missing required fields: productId, title, price, image' 
      });
    }
    
    const existingItem = await Cart.findOne({ productId });
    
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      
      return res.json({
        message: 'Cart updated successfully',
        item: existingItem
      });
    }
    
    const cartItem = new Cart({
      productId,
      title,
      price,
      image,
      quantity: quantity || 1
    });
    
    await cartItem.save();
    
    res.status(201).json({
      message: 'Item added to cart successfully',
      item: cartItem
    });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ 
      message: 'Error adding to cart', 
      error: error.message 
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ 
        message: 'Quantity must be at least 1' 
      });
    }
    
    const cartItem = await Cart.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    cartItem.quantity = quantity;
    await cartItem.save();
    
    res.json({
      message: 'Cart item updated successfully',
      item: cartItem
    });
  } catch (error) {
    console.error('Error updating cart item:', error.message);
    res.status(500).json({ 
      message: 'Error updating cart item', 
      error: error.message 
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    await Cart.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Item removed from cart successfully',
      id: req.params.id
    });
  } catch (error) {
    console.error('Error removing cart item:', error.message);
    res.status(500).json({ 
      message: 'Error removing cart item', 
      error: error.message 
    });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Cart.deleteMany({});
    
    res.json({ 
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ 
      message: 'Error clearing cart', 
      error: error.message 
    });
  }
});

export default router;

