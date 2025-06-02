import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem('username', name);
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className='body'>
      <form className="signup-form" onSubmit={handleSignup}>
        <center><h2>🛒 MetaBazar</h2></center>
        Name:
        <input type='text' className="input-field" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} required />
        Email:
        <input type='email' className="input-field" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required />
        Password:
        <input type='password' className="input-field" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required />
        <button type='submit' className="submit-button">Signup</button>
        <p>
          Already have an account?{' '}
          <Link to="/login" className="link-text">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
