import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Ordersummary from './pages/Ordersummery';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { auth } from './firebase';
import Admin from './pages/Admin';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current path


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  const goToCartPage = () => {
    navigate('/cart');
  };
  const isAuthenticated = user || localStorage.getItem('JWT_SECRET');
  return (
    <>
      {/* ✅ Navbar only when NOT on login or signup */}
      {location.pathname !== '/login' && location.pathname !== '/' && (
        <Navbar cartCount={cart.length} onCartClick={goToCartPage} />
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route
  path="/home"
  element={isAuthenticated ? <Home cart={cart} setCart={setCart}/> : <LoginRedirect />}
/>
        <Route path="/cart" element={isAuthenticated ? <Cart /> : <LoginRedirect />} />

        <Route
          path="/order"
          element={isAuthenticated ? <Order /> : <LoginRedirect />}
        />
        <Route
          path="/ordersummary"
          element={isAuthenticated ? <Ordersummary /> : <LoginRedirect />}
        />
        <Route path='/admin' element={<Admin/>}/>
      </Routes>

      <Footer />
    </>
  );
};

// 🔁 Redirect helper
const LoginRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return null;
};

export default App;
