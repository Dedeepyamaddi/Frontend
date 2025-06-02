// src/pages/OrderSummary.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || JSON.parse(localStorage.getItem('userAddress'));

  if (!formData) return <p className="order-error">No order data found.</p>;

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">🧾 Order Summary</h2>

      <div className="order-summary-details">
        <p><strong>Name:</strong> {formData.fullName}</p>
        <p><strong>Address:</strong> {formData.address}, {formData.city}, {formData.postalCode}</p>
        <p><strong>Phone:</strong> {formData.phone || 'Not Provided'}</p>
        <p><strong>Payment Method:</strong> {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
      </div>

      <h4 className="order-confirm-msg">✅ Your order has been placed successfully!</h4>

      <div className="order-summary-actions">
        <button
          className="order-summary-button"
          onClick={() => {
            localStorage.removeItem('userAddress');
            window.location.href = '/order';
          }}
        >
          Change Address
        </button>

        <button
          className="order-summary-button confirm"
          onClick={() => {
            alert('Purchase Confirmed!');
            localStorage.removeItem('cartItems'); // Clear cart
            navigate('/home');
          }}>
          Confirm Purchase
        </button>

      </div>
    </div>
  );
};

export default OrderSummary;
