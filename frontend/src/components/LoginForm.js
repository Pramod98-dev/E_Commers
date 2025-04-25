import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onClose, onSwitch, onLogin, loginType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: loginType })
      });
      const data = await response.json();
      if (response.ok) {
        if (onLogin) onLogin(data);
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <h2>{loginType === "admin" ? "Admin Login" : "User Login"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="form-error">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <div className="modal-switch">
          {loginType === "admin" ? (
            <span>Admin access only</span>
          ) : (
            <>
              Don't have an account? <button onClick={() => onSwitch("signup")}>Sign Up</button>
            </>
          )}
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default LoginForm;
