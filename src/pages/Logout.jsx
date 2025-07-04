import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
       localStorage.removeItem('username');
  localStorage.removeItem('token');
      alert('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
