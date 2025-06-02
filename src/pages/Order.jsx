// src/pages/Order.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Order = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('userAddress');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userAddress', JSON.stringify(formData));
    navigate('/ordersummary', { state: { formData } });
  };

  return (
    <div className="order-container">
      <h2 className="order-heading">Enter Delivery Address</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="order-input"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="order-input"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="order-input"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          className="order-input"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="order-input"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <label className="order-label">
          Payment Method:
          <select
            name="paymentMethod"
            className="order-select"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="online">Online Payment</option>
          </select>
        </label>
        <button type="submit" className="order-button">Place Order</button>
      </form>
    </div>
  );
};

export default Order;
