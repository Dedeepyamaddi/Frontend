import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  // Hardcoded developer credentials
  const DEVELOPER_EMAIL = 'admin4432@gmail.com';
  const DEVELOPER_PASSWORD = 'admin4432';

  const [auth, setAuth] = useState({ email: '', password: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [product, setProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  });

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuth(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      auth.email === DEVELOPER_EMAIL &&
      auth.password === DEVELOPER_PASSWORD
    ) {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Invalid developer credentials');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rate' || name === 'count') {
      setProduct(prev => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value
        }
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productToSend = {
      ...product,
      price: parseFloat(product.price),
      rating: {
        rate: parseFloat(product.rating.rate),
        count: parseInt(product.rating.count)
      }
    };

    try {
      const res = await fetch('http://localhost:4000/api/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToSend)
      });

      if (res.ok) {
        alert('Product added successfully!');
        navigate('/home');
      } else {
        throw new Error('Failed to add product.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error adding product.');
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Developer Login</h2>
        <input
          type="email"
          name="email"
          value={auth.email}
          onChange={handleAuthChange}
          placeholder="Developer Email"
          required
          className="form-in"
        />
        <input
          type="password"
          name="password"
          value={auth.password}
          onChange={handleAuthChange}
          placeholder="Password"
          required
          className="form-in"
        />
        <button type="submit" className="submit">Login</button>
      </form>
    );
  }

  // Show admin product form after successful login
  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2 className="form-title">Add New Product</h2>

      {['id', 'title', 'price', 'description', 'category', 'image'].map(field => (
        <input
          key={field}
          name={field}
          value={product[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="form-input"
          required
        />
      ))}

      <input
        name="rate"
        value={product.rating.rate}
        onChange={handleChange}
        placeholder="Rating (rate)"
        className="form-input"
        required
        type="number"
        step="0.1"
      />
      <input
        name="count"
        value={product.rating.count}
        onChange={handleChange}
        placeholder="Rating (count)"
        className="form-input"
        required
        type="number"
      />

      <button type="submit" className="submit-btn">Add Product</button>
    </form>
  );
};

export default Admin;
