import React, { useEffect, useState } from 'react';

const Home = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('https://backend-f361.onrender.com/api/store')
      .then(res => res.json())
      .then(data => {
        setProducts(data.stores);
        setFiltered(data.stores);
      });
  }, []);

  const handleAddToCart = (product) => {
  const updatedCart = [...cart, product];
  setCart(updatedCart);
  localStorage.setItem('cartItems', JSON.stringify(updatedCart));
};

  const filterByCategory = (category) => {
    const result = products.filter(p => p.category === category);
    setFiltered(result);
  };

  const showAll = () => setFiltered(products);

  return (
    <div className="home-container">
      <center>
        <div style={{ marginBottom: '20px' }}>
          <button className="category-button" onClick={showAll}>All</button>
          <button className="category-button" onClick={() => filterByCategory("Men")}>Men's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("Women")}>Women's Clothing</button>
          <button className="category-button" onClick={() => filterByCategory("jewelery")}>Jewelery</button>
          <button className="category-button" onClick={() => filterByCategory("electronics")}>Electronics</button>
        </div>
      </center>

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.title}</h4>
            <img src={product.image} alt={product.title} />
            <p><strong>${product.price}</strong></p>
            <p style={{ fontSize: '13px', flexGrow: 1 }}>{product.description.slice(0, 60)}...</p>
            <button className="add-button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
