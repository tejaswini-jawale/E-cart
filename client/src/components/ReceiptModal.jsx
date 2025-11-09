import './ReceiptModal.css';

function ReceiptModal({ receipt, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="receipt-content">
            <div className="success-icon">✓</div>
            <h3 className="success-message">Thank you for your order!</h3>
            
            <div className="receipt-details">
              <div className="receipt-section">
                <h4>Order Information</h4>
                <div className="receipt-row">
                  <span className="label">Order Number:</span>
                  <span className="value">{receipt.orderNumber}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Date:</span>
                  <span className="value">{formatDate(receipt.timestamp)}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Status:</span>
                  <span className="value status-badge">{receipt.status}</span>
                </div>
              </div>

              <div className="receipt-section">
                <h4>Customer Information</h4>
                <div className="receipt-row">
                  <span className="label">Name:</span>
                  <span className="value">{receipt.customerName}</span>
                </div>
                <div className="receipt-row">
                  <span className="label">Email:</span>
                  <span className="value">{receipt.customerEmail}</span>
                </div>
              </div>

              <div className="receipt-section">
                <h4>Order Items</h4>
                <div className="receipt-items">
                  {receipt.items.map((item, index) => (
                    <div key={index} className="receipt-item">
                      <div className="item-info">
                        <span className="item-name">{item.title}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <span className="item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="receipt-total">
                <span className="total-label">Total Amount:</span>
                <span className="total-amount">${receipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="receipt-footer">
              <p className="receipt-note">
                A confirmation email has been sent to {receipt.customerEmail}
              </p>
              <div className="receipt-actions">
                <button className="btn-secondary" onClick={handlePrint}>
                  🖨️ Print Receipt
                </button>
                <button className="btn-primary" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;

