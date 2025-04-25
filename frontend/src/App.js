import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CategorySection from './components/CategorySection';

function App() {
  const [loginType, setLoginType] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLoginClick = (type) => {
    setLoginType(type);
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Login Clicked!`);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowLoginPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowLoginPrompt(false);
    setSelectedProduct(null);
  };

  return (
    <div className="App">
      <Header onLoginClick={handleLoginClick} />
      <main className="main-content enhanced-main">
        <CategorySection onProductClick={handleProductClick} />
        {showLoginPrompt && (
          <div className="login-modal-backdrop" onClick={handleClosePrompt}>
            <div className="login-modal" onClick={e => e.stopPropagation()}>
              <h3>Login or Sign Up Required</h3>
              <p>To view details or purchase <b>{selectedProduct?.name}</b>, please login or sign up.</p>
              <div className="login-modal-actions">
                <button className="hero-btn" onClick={() => { handleLoginClick('user'); handleClosePrompt(); }}>Login</button>
                <button className="hero-btn" onClick={() => { alert('Sign Up Clicked!'); handleClosePrompt(); }}>Sign Up</button>
                <button className="hero-btn btn-cancel" onClick={handleClosePrompt}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
