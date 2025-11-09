import { useState } from 'react';
import './CartItem.css';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [imageError, setImageError] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item._id, newQuantity);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        {!imageError ? (
          <img
            src={item.image}
            alt={item.title}
            onError={handleImageError}
          />
        ) : (
          <div className="cart-item-image-placeholder">📦</div>
        )}
      </div>

      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.title}</h4>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            className="remove-btn"
            onClick={() => onRemove(item._id)}
            title="Remove from cart"
          >
            🗑️ Remove
          </button>
        </div>

        <div className="cart-item-subtotal">
          Subtotal: ${(item.price * quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartItem;

