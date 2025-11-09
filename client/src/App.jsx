import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { productsAPI, cartAPI } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setError(null);
      await cartAPI.addToCart(product);
      await fetchCart();
      
      const button = document.querySelector(`[data-product-id="${product.id}"]`);
      if (button) {
        button.textContent = '✓ Added!';
        button.style.backgroundColor = '#10b981';
        setTimeout(() => {
          button.textContent = 'Add to Cart';
          button.style.backgroundColor = '';
        }, 1500);
      }
    } catch (err) {
      setError('Failed to add item to cart. Please try again.');
      console.error(err);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      setError(null);
      await cartAPI.updateCartItem(itemId, quantity);
      await fetchCart();
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
      console.error(err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      setError(null);
      await cartAPI.removeFromCart(itemId);
      await fetchCart();
    } catch (err) {
      setError('Failed to remove item. Please try again.');
      console.error(err);
    }
  };

  const handleCheckoutSuccess = (receiptData) => {
    setReceipt(receiptData);
    setShowCheckout(false);
    setShowCart(false);
    fetchCart();
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleProceedToCheckout = () => {
    if (cart.items.length === 0) {
      setError('Your cart is empty!');
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  return (
    <div className="app">
      <Header 
        cartItemCount={cart.itemCount} 
        onCartClick={toggleCart}
      />
      
      <main className="main-content">
        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProductGrid 
            products={products} 
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {showCart && (
        <Cart
          cart={cart}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={handleProceedToCheckout}
        />
      )}

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}

export default App;

