import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <p>Loading products...</p>
    </div>
  );
}

export default LoadingSpinner;

