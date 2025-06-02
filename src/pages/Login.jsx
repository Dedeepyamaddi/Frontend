import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider as googleProvider } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Email/Password Login (JWT Backend)
  const loginWithJWT = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

     if (data.success) {
      
  localStorage.setItem('JWT_SECRET', data.JWT_SECRET);
  console.log("Login success, navigating...");
  navigate('/home');
} else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  // Google Login with Firebase
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='body'>
      <form className="login-form" onSubmit={loginWithJWT}>
        <h2>Login</h2>
        <input
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
        <button
          type="button"
          className="login-button google-button"
          onClick={loginWithGoogle}
        >
          Login with Google
        </button>
        <p>
          Don't have an account? <a href="/">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
