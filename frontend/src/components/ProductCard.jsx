import { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="product-image-placeholder">
            <span>📦</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title" title={product.title}>
          {truncateText(product.title, 50)}
        </h3>
        
        <p className="product-description">
          {truncateText(product.description, 80)}
        </p>
        
        <div className="product-footer">
          <div className="product-price-section">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.rating && (
              <span className="product-rating">
                ⭐ {product.rating.rate} ({product.rating.count})
              </span>
            )}
          </div>
          
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            data-product-id={product.id}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

