import express from 'express';
import axios from 'axios';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let products = await Product.find({});
    
    if (products.length === 0) {
      console.log('Fetching products from Fake Store API...');
      const response = await axios.get('https://fakestoreapi.com/products');
      const apiProducts = response.data.slice(0, 10);
      
      products = await Product.insertMany(apiProducts);
      console.log('Products cached in database');
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ 
      message: 'Error fetching products', 
      error: error.message 
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ 
      message: 'Error fetching product', 
      error: error.message 
    });
  }
});

export default router;

