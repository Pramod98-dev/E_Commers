import React from "react";
import "./Dashboard.css";

const AdminDashboard = ({ admin }) => (
  <div className="dashboard-container">
    <h2>Welcome, {admin?.name || "Admin"}!</h2>
    <p>This is your admin dashboard. Manage products, view analytics, and handle orders.</p>
    {/* Add more admin-specific features here */}
  </div>
);

export default AdminDashboard;
