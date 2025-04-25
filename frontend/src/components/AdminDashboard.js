import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { OrdersPerProductChart, OrdersPerStatusChart } from "./Charts";
import AdminSidebar from "./AdminSidebar";
import "./AdminSidebar.css";

const AdminDashboard = ({ admin }) => {
  const [section, setSection] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState(null);
  const [ordersPerProduct, setOrdersPerProduct] = useState({});
  const [ordersPerStatus, setOrdersPerStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(null); // id of product being edited
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", description: "" });
  const [editProduct, setEditProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const [resOrders, resProducts, resSummary, resOrdersPerProduct, resOrdersPerStatus] = await Promise.all([
          fetch("http://localhost:8080/api/admin/orders"),
          fetch("http://localhost:8080/api/admin/products"),
          fetch("http://localhost:8080/api/admin/report/summary"),
          fetch("http://localhost:8080/api/admin/report/orders-per-product"),
          fetch("http://localhost:8080/api/admin/report/orders-per-status")
        ]);
        const ordersData = await resOrders.json();
        const productsData = await resProducts.json();
        const summaryData = await resSummary.json();
        const oppData = await resOrdersPerProduct.json();
        const opsData = await resOrdersPerStatus.json();
        if (resOrders.ok) setOrders(ordersData.orders || []);
        else setError(ordersData.error || "Could not fetch orders");
        if (resProducts.ok) setProducts(productsData.products || []);
        else setError(productsData.error || "Could not fetch products");
        setSummary(summaryData);
        setOrdersPerProduct(oppData);
        setOrdersPerStatus(opsData);
      } catch (err) {
        setError("Server error. Try again later.");
      }
      setLoading(false);
    }
    fetchData();
  }, [admin]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock),
          description: newProduct.description
        })
      });
      if (res.ok) {
        setShowAddProduct(false);
        setNewProduct({ name: "", price: "", stock: "", description: "" });
        // Refresh product list
        const productsRes = await fetch("http://localhost:8080/api/admin/products");
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      } else {
        setError("Failed to add product.");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  const handleEditProduct = (product) => {
    setShowEditProduct(product.id);
    setEditProduct(product);
  };

  const handleEditProductSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/api/admin/products/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProduct)
      });
      if (res.ok) {
        setShowEditProduct(null);
        setEditProduct({});
        const productsRes = await fetch("http://localhost:8080/api/admin/products");
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      } else {
        setError("Failed to update product.");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  const handleDeleteProduct = async (id) => {
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/api/admin/products/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        setError("Failed to delete product.");
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  function renderSection() {
    switch (section) {
      case "dashboard":
        return (
          <div className="admin-main-section">
            <h2>Welcome, {admin?.name || "Admin"}!</h2>
            <div style={{marginBottom: 24}}>
              <b>Email:</b> {admin?.email}<br/>
              <b>Role:</b> {admin?.role}
            </div>
            <div className="admin-summary">
              <h3>Summary</h3>
              {summary && (
                <ul>
                  <li><b>Total Orders:</b> {summary.totalOrders}</li>
                  <li><b>Total Products:</b> {summary.totalProducts}</li>
                  <li><b>Total Revenue:</b> ₹{summary.totalRevenue}</li>
                </ul>
              )}
            </div>
            <div className="admin-charts">
              <div style={{maxWidth: 400, margin: "32px auto"}}>
                <h4>Orders per Product</h4>
                <OrdersPerProductChart data={ordersPerProduct} />
              </div>
              <div style={{maxWidth: 400, margin: "32px auto"}}>
                <h4>Orders per Status</h4>
                <OrdersPerStatusChart data={ordersPerStatus} />
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="admin-main-section">
            <h3 style={{marginTop: 0}}>All Products</h3>
            <button onClick={() => setShowAddProduct(!showAddProduct)} style={{marginBottom: 16}}>
              {showAddProduct ? "Cancel" : "Add Product"}
            </button>
            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="add-product-form">
                <input required placeholder="Name" value={newProduct.name} onChange={e => setNewProduct(p => ({...p, name: e.target.value}))} />
                <input required type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct(p => ({...p, price: e.target.value}))} />
                <input required type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct(p => ({...p, stock: e.target.value}))} />
                <textarea required placeholder="Description" value={newProduct.description} onChange={e => setNewProduct(p => ({...p, description: e.target.value}))} />
                <button type="submit">Add</button>
              </form>
            )}
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
                    {showEditProduct === product.id ? (
                      <form onSubmit={handleEditProductSubmit} className="edit-product-form" style={{marginBottom: 8}}>
                        <input required value={editProduct.name} onChange={e => setEditProduct(p => ({...p, name: e.target.value}))} />
                        <input required type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({...p, price: e.target.value}))} />
                        <input required type="number" value={editProduct.stock} onChange={e => setEditProduct(p => ({...p, stock: e.target.value}))} />
                        <textarea required value={editProduct.description} onChange={e => setEditProduct(p => ({...p, description: e.target.value}))} />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowEditProduct(null)}>Cancel</button>
                      </form>
                    ) : (
                      <React.Fragment>
                        <b>{product.name}</b> - Price: ₹{product.price} - Stock: {product.stock}
                        <div style={{fontSize: 13, color: "#666", margin: "4px 0 8px 0"}}>{product.description}</div>
                        <button onClick={() => handleEditProduct(product)} style={{marginRight: 8}}>Edit</button>
                        <button onClick={() => handleDeleteProduct(product.id)} style={{color: "#e53935"}}>Delete</button>
                      </React.Fragment>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "orders":
        return (
          <div className="admin-main-section">
            <h3 style={{marginTop: 0}}>All Orders</h3>
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
          </div>
        );
      case "analytics":
        return (
          <div className="admin-main-section">
            <h3 style={{marginTop: 0}}>Analytics</h3>
            <div className="admin-charts">
              <div style={{maxWidth: 400, margin: "32px auto"}}>
                <h4>Orders per Product</h4>
                <OrdersPerProductChart data={ordersPerProduct} />
              </div>
              <div style={{maxWidth: 400, margin: "32px auto"}}>
                <h4>Orders per Status</h4>
                <OrdersPerStatusChart data={ordersPerStatus} />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar active={section} onSelect={setSection} />
      <main className="admin-dashboard-main">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
