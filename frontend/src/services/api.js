import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }
};

export const cartAPI = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },
  
  addToCart: async (product, quantity = 1) => {
    try {
      const response = await api.post('/cart', {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },
  
  updateCartItem: async (id, quantity) => {
    try {
      const response = await api.put(`/cart/${id}`, { quantity });
      return response.data;
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  },
  
  removeFromCart: async (id) => {
    try {
      const response = await api.delete(`/cart/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },
  
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

export const checkoutAPI = {
  processCheckout: async (customerName, customerEmail, cartItems) => {
    try {
      const response = await api.post('/checkout', {
        customerName,
        customerEmail,
        cartItems
      });
      return response.data;
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw error;
    }
  },
  
  getOrders: async () => {
    try {
      const response = await api.get('/checkout/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },
  
  getOrderByNumber: async (orderNumber) => {
    try {
      const response = await api.get(`/checkout/orders/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
};

export default api;

