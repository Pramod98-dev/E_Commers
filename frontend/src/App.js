import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryCardSection from "./components/CategoryCardSection";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [loginType, setLoginType] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(null); // "login" | "signup" | null

  const handleLoginClick = (type) => {
    setLoginType(type);
    setShowAuthModal("login");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowLoginPrompt(true);
  };

  const handleClosePrompt = () => {
    setShowLoginPrompt(false);
    setSelectedCategory(null);
  };

  const handleAuthClose = () => setShowAuthModal(null);
  const handleAuthSwitch = (target) => setShowAuthModal(target);

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
                    setShowAuthModal("login");
                    setShowLoginPrompt(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="hero-btn"
                  onClick={() => {
                    setShowAuthModal("signup");
                    setShowLoginPrompt(false);
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
        {showAuthModal === "login" && (
          <LoginForm onClose={handleAuthClose} onSwitch={handleAuthSwitch} />
        )}
        {showAuthModal === "signup" && (
          <SignUpForm onClose={handleAuthClose} onSwitch={handleAuthSwitch} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
