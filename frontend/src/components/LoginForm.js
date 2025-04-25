import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend
    alert(`Login attempted for ${email}`);
    onClose && onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
        <div className="modal-switch">
          Don't have an account? <button onClick={() => onSwitch("signup")}>Sign Up</button>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default LoginForm;
