import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryCardSection from "./components/CategoryCardSection";

function App() {
  const [loginType, setLoginType] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLoginClick = (type) => {
    setLoginType(type);
    alert(`${type.charAt(0).toUpperCase() + type.slice(1)} Login Clicked!`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowLoginPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowLoginPrompt(false);
    setSelectedCategory(null);
  };

  return (
    <div className="App">
      <Header onLoginClick={handleLoginClick} />
      <main className="main-content enhanced-main">
        <CategoryCardSection onCategoryClick={handleCategoryClick} />
        {showLoginPrompt && (
          <div className="login-modal-backdrop" onClick={handleClosePrompt}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Login or Sign Up Required</h3>
              <p>
                To explore <b>{selectedCategory?.name}</b>, please login or sign up.
              </p>
              <div className="login-modal-actions">
                <button
                  className="hero-btn"
                  onClick={() => {
                    handleLoginClick("user");
                    handleClosePrompt();
                  }}
                >
                  Login
                </button>
                <button
                  className="hero-btn"
                  onClick={() => {
                    alert("Sign Up Clicked!");
                    handleClosePrompt();
                  }}
                >
                  Sign Up
                </button>
                <button
                  className="hero-btn btn-cancel"
                  onClick={handleClosePrompt}
                >
                  Cancel
                </button>
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
