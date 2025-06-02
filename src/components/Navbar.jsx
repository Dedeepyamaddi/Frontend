import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import '../pages/Home.css';
import Logout from '../pages/Logout';

const Navbar = ({ cartCount, onCartClick }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || user.email);
      } else {
        const localUser = localStorage.getItem('username');
        if (localUser) {
          setUsername(localUser); // 👈 Use name from localStorage
        } else {
          setUsername('');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-logo">🛒 MetaBazar</Link>
      <div className="navbar-actions">
        <div className="navbar-user">👤 {username}</div>
        <button className="cart-button" onClick={onCartClick}>
          View Cart ({cartCount})
        </button>
        <Logout />
      </div>
    </nav>
  );
};

export default Navbar;
