import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoryCardSection from "./components/CategoryCardSection";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [loginType, setLoginType] = useState(null); // "user" | "admin"
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(null); // "login" | "signup" | null
  const [user, setUser] = useState(null); // {name, email, role}
  const [admin, setAdmin] = useState(null); // {name, email, role}

  // Persist login state in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    if (admin) localStorage.setItem("admin", JSON.stringify(admin));
    else localStorage.removeItem("admin");
  }, [user, admin]);

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

  // Simulate login for user/admin
  const handleLogin = (credentials) => {
    if (loginType === "admin") {
      setAdmin({ name: "Admin", email: credentials.email, role: "admin" });
      setUser(null);
    } else {
      setUser({ name: "User", email: credentials.email, role: "user" });
      setAdmin(null);
    }
    setShowAuthModal(null);
  };

  // Simulate sign up for user (admin sign up not exposed)
  const handleSignUp = (details) => {
    setUser({ name: details.name, email: details.email, role: "user" });
    setAdmin(null);
    setShowAuthModal(null);
  };

  const handleLogout = () => {
    setUser(null);
    setAdmin(null);
    setLoginType(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  return (
    <div className="App">
      <Header
        onLoginClick={handleLoginClick}
        user={user}
        admin={admin}
        onLogout={handleLogout}
      />
      <main className="main-content enhanced-main">
        {user ? (
          <UserDashboard user={user} />
        ) : admin ? (
          <AdminDashboard admin={admin} />
        ) : (
          <CategoryCardSection onCategoryClick={handleCategoryClick} />
        )}
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
                    setLoginType("user");
                    setShowAuthModal("login");
                    setShowLoginPrompt(false);
                  }}
                >
                  Login
                </button>
                <button
                  className="hero-btn"
                  onClick={() => {
                    setLoginType("user");
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
          <LoginForm
            onClose={handleAuthClose}
            onSwitch={handleAuthSwitch}
            onLogin={handleLogin}
            loginType={loginType}
          />
        )}
        {showAuthModal === "signup" && (
          <SignUpForm
            onClose={handleAuthClose}
            onSwitch={handleAuthSwitch}
            onSignUp={handleSignUp}
          />
        )}
        {(user || admin) && (
          <button className="hero-btn btn-cancel" style={{marginTop: 24}} onClick={handleLogout}>
            Logout
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
