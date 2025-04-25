import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const AdminDashboard = ({ admin }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        // Fetch all orders
        const resOrders = await fetch("http://localhost:8080/api/admin/orders");
        const ordersData = await resOrders.json();
        // Fetch all products
        const resProducts = await fetch("http://localhost:8080/api/admin/products");
        const productsData = await resProducts.json();
        if (resOrders.ok) setOrders(ordersData.orders || []);
        else setError(ordersData.error || "Could not fetch orders");
        if (resProducts.ok) setProducts(productsData.products || []);
        else setError(productsData.error || "Could not fetch products");
      } catch (err) {
        setError("Server error. Try again later.");
      }
      setLoading(false);
    }
    fetchData();
  }, [admin]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {admin?.name || "Admin"}!</h2>
      <div style={{marginBottom: 24}}>
        <b>Email:</b> {admin?.email}<br/>
        <b>Role:</b> {admin?.role}
      </div>
      <h3>All Orders</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul style={{textAlign: "left", maxWidth: 600, margin: "0 auto"}}>
          {orders.map((order, idx) => (
            <li key={order.id || idx}>
              <b>Order #{order.id}</b>: {order.product} - Qty: {order.quantity} - Status: {order.status} - User: {order.userEmail}
            </li>
          ))}
        </ul>
      )}
      <h3 style={{marginTop: 32}}>All Products</h3>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="form-error">{error}</div>
      ) : products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <ul style={{textAlign: "left", maxWidth: 600, margin: "0 auto"}}>
          {products.map((product, idx) => (
            <li key={product.id || idx}>
              <b>{product.name}</b> - Price: ₹{product.price} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
