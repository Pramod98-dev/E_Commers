import React, { useState } from "react";
import "./LoginForm.css";

const SignUpForm = ({ onClose, onSwitch, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        if (onSignUp) onSignUp(data);
      } else {
        setError(data.error || "Sign up failed");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
        </form>
        <div className="modal-switch">
          Already have an account? <button onClick={() => onSwitch("login")}>Login</button>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SignUpForm;
