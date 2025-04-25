import React from "react";
import "./Dashboard.css";

const UserDashboard = ({ user }) => (
  <div className="dashboard-container">
    <h2>Welcome, {user?.name || "User"}!</h2>
    <p>This is your user dashboard. Browse products, view orders, and manage your account.</p>
    {/* Add more user-specific features here */}
  </div>
);

export default UserDashboard;
