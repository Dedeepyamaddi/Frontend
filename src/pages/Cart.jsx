import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

 const initialCartRaw = location.state?.cart || JSON.parse(localStorage.getItem('cartItems')) || [];
   const initialCart = initialCartRaw.map(item => ({
     ...item,
     quantity: item.quantity || 1,
   }));
 
   const [cart, setCart] = useState(initialCart);
 
   useEffect(() => {
     localStorage.setItem('cartItems', JSON.stringify(cart));
   }, [cart]);
 
   const handleIncrease = (index) => {
     const newCart = [...cart];
     newCart[index].quantity += 1;
     setCart(newCart);
   };
 
   const handleDecrease = (index) => {
     const newCart = [...cart];
     if (newCart[index].quantity > 1) {
       newCart[index].quantity -= 1;
     } else {
       newCart.splice(index, 1); // Remove item if quantity is 1
     }
     setCart(newCart);
   };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Cart Page</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">No items in the cart.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item-card">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.title}</h4>
              <b className="price">${item.price.toFixed(2)}</b>
              <p className="rating">⭐ {item.rating?.rate || 4.5}</p>

              <div className="quantity-control">
                <button onClick={() => handleDecrease(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrease(index)}>+</button>
              </div>

              <p className="total-cost">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                className="buy-button"
                onClick={() => navigate('/order', { state: { cart: [item] } })}
              >
                Process Order
              </button>

            </div>
          </div>
        ))
      )}

      
    </div>
  );
};

export default Cart;