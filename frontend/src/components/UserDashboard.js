import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const UserDashboard = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        // Fetch user profile (simulate with user prop)
        setProfile(user);
        // Fetch user orders
        const res = await fetch(`http://localhost:8080/api/user/orders?email=${user.email}`);
        const data = await res.json();
        if (res.ok) setOrders(data.orders || []);
        else setError(data.error || "Could not fetch orders");
      } catch (err) {
        setError("Server error. Try again later.");
      }
      setLoading(false);
    }
    if (user?.email) fetchData();
  }, [user]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {profile?.name || "User"}!</h2>
      <div style={{marginBottom: 24}}>
        <b>Email:</b> {profile?.email}<br/>
        <b>Role:</b> {profile?.role}
      </div>
      <h3>Your Orders</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul style={{textAlign: "left", maxWidth: 500, margin: "0 auto"}}>
          {orders.map((order, idx) => (
            <li key={order.id || idx}>
              <b>Order #{order.id}</b>: {order.product} - Qty: {order.quantity} - Status: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
