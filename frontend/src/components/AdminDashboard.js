import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { OrdersPerProductChart, OrdersPerStatusChart } from "./Charts";
import AdminSidebar from "./AdminSidebar";
import "./AdminSidebar.css";
import "./AdminDashboard.css";
import DashboardStats from "./DashboardStats";
import "./DashboardStats.css";

const AdminDashboard = ({ admin, onLogout }) => {
  const [section, setSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
          <div className="admin-main-section stylish-section" style={{padding: 0, background: '#fff', boxShadow: 'none'}}>
            <div style={{padding: '34px 34px 0 34px'}}>
              <DashboardStats summary={summary} />
              <div className="dashboard-analytics-row" style={{display: 'flex', gap: 20, marginBottom: 24}}>
                <div className="card" style={{flex: 2, minWidth: 0}}>
                  <h4 style={{marginTop: 0}}>E-commerce Overview</h4>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 18, fontSize: 16}}>
                    <div>
                      <b>Total Products</b>
                      <div style={{fontSize: 22, color: '#1976d2', fontWeight: 700}}>{summary?.totalProducts ?? '--'}</div>
                    </div>
                    <div>
                      <b>Total Orders</b>
                      <div style={{fontSize: 22, color: '#43a047', fontWeight: 700}}>{summary?.totalOrders ?? '--'}</div>
                    </div>
                    <div>
                      <b>Total Revenue</b>
                      <div style={{fontSize: 22, color: '#e53935', fontWeight: 700}}>₹{summary?.totalRevenue ?? '--'}</div>
                    </div>
                  </div>
                  <OrdersPerProductChart data={ordersPerProduct} />
                  <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 18, fontSize: 15}}>
                    <span><b>Top Product</b><br/>{products?.[0]?.name ?? 'N/A'}</span>
                    <span><b>Stock Left</b><br/>{products?.[0]?.stock ?? 'N/A'}</span>
                    <span><b>Recent Order</b><br/>{orders?.[0]?.product ?? 'N/A'}</span>
                  </div>
                </div>
                <div style={{flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20}}>
                  <div className="card" style={{marginBottom: 0}}>
                    <h4 style={{marginTop: 0, color: '#43a047'}}>Customer Satisfaction</h4>
                    <div style={{fontSize: 32, fontWeight: 700, color: '#43a047', marginBottom: 8}}>93.13%</div>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 13}}>
                      <span>Previous<br/>79.82</span>
                      <span>% Change<br/>+14.29</span>
                      <span>Trend<br/><span style={{color: '#43a047', fontWeight: 600}}>↑</span></span>
                    </div>
                  </div>
                  <div className="card" style={{marginBottom: 0}}>
                    <h4 style={{marginTop: 0}}>Browser Stats</h4>
                    <div style={{fontSize: 15, lineHeight: 2}}>
                      <span>Google Chrome <span style={{color: '#43a047', fontWeight: 600}}>65%</span></span><br/>
                      <span>Mozilla Firefox <span style={{color: '#e53935', fontWeight: 600}}>12%</span></span><br/>
                      <span>Internet Explorer <span style={{color: '#1976d2', fontWeight: 600}}>9%</span></span><br/>
                      <span>Safari <span style={{color: '#fbc02d', fontWeight: 600}}>8%</span></span>
                    </div>
                  </div>
                </div>
                <div className="card" style={{flex: 1, minWidth: 0}}>
                  <h4 style={{marginTop: 0}}>Order Status Breakdown</h4>
                  <OrdersPerStatusChart data={ordersPerStatus} />
                  <div style={{fontSize: 13, marginTop: 12}}>
                    <span style={{color: '#1976d2'}}>Delivered: {ordersPerStatus?.Delivered ?? '--'}</span><br/>
                    <span style={{color: '#e53935'}}>Cancelled: {ordersPerStatus?.Cancelled ?? '--'}</span><br/>
                    <span style={{color: '#43a047'}}>Processing: {ordersPerStatus?.Processing ?? '--'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="admin-main-section stylish-section">
            <h3 className="admin-title">All Products</h3>
            <button className="primary-btn" onClick={() => setShowAddProduct(!showAddProduct)} style={{marginBottom: 16}}>
              {showAddProduct ? "Cancel" : "Add Product"}
            </button>
            {showAddProduct && (
              <form onSubmit={handleAddProduct} className="add-product-form card">
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
              <ul className="product-list">
                {products.map((product, idx) => (
                  <li className="product-card card" key={product.id || idx}>
                    {showEditProduct === product.id ? (
                      <form onSubmit={handleEditProductSubmit} className="edit-product-form">
                        <input required value={editProduct.name} onChange={e => setEditProduct(p => ({...p, name: e.target.value}))} />
                        <input required type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({...p, price: e.target.value}))} />
                        <input required type="number" value={editProduct.stock} onChange={e => setEditProduct(p => ({...p, stock: e.target.value}))} />
                        <textarea required value={editProduct.description} onChange={e => setEditProduct(p => ({...p, description: e.target.value}))} />
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowEditProduct(null)}>Cancel</button>
                      </form>
                    ) : (
                      <React.Fragment>
                        <div className="product-main">
                          <b>{product.name}</b>
                          <span className="product-price">₹{product.price}</span>
                          <span className="product-stock">Stock: {product.stock}</span>
                        </div>
                        <div className="product-desc">{product.description}</div>
                        <div className="product-actions">
                          <button className="secondary-btn" onClick={() => handleEditProduct(product)} style={{marginRight: 8}}>Edit</button>
                          <button className="danger-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
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
          <div className="admin-main-section stylish-section">
            <h3 className="admin-title">All Orders</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div className="form-error">{error}</div>
            ) : orders.length === 0 ? (
              <div>No orders found.</div>
            ) : (
              <ul className="order-list">
                {orders.map((order, idx) => (
                  <li className="order-card card" key={order.id || idx}>
                    <div className="order-main">
                      <b>Order #{order.id}</b>
                      <span className="order-product">{order.product}</span>
                      <span className="order-qty">Qty: {order.quantity}</span>
                      <span className="order-status">Status: {order.status}</span>
                      <span className="order-user">User: {order.userEmail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "analytics":
        return (
          <div className="admin-main-section stylish-section">
            <h3 className="admin-title">Analytics</h3>
            <div className="admin-charts">
              <div className="card" style={{maxWidth: 400, margin: "32px auto"}}>
                <h4>Orders per Product</h4>
                <OrdersPerProductChart data={ordersPerProduct} />
              </div>
              <div className="card" style={{maxWidth: 400, margin: "32px auto"}}>
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
      <header
        className="admin-header"
        style={{
          marginLeft: sidebarCollapsed ? 60 : 220,
          transition: 'margin-left 0.2s',
          background: 'linear-gradient(90deg, #232f3e 70%, #febd69 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(35,47,62,0.09)',
          zIndex: 101,
          width: '100%',
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          left: 0,
          top: 0,
          padding: '0 38px 0 38px',
          borderBottom: '2px solid #f7dfa5',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ color: '#febd69', fontWeight: 700, fontSize: 22, letterSpacing: 1.5 }}>Ms Mobile Admin</span>
          <span style={{ fontSize: 14, color: '#fff', background: 'rgba(35,47,62,0.15)', borderRadius: 6, padding: '3px 12px', marginLeft: 12, fontWeight: 500 }}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </span>
        </div>
        <button
          style={{
            background: 'linear-gradient(90deg, #febd69 80%, #fffbe6 100%)',
            border: 'none',
            color: '#232f3e',
            padding: '8px 18px',
            borderRadius: 7,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 1px 6px rgba(35,47,62,0.07)',
            transition: 'background 0.2s',
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </header>
      <main className="admin-dashboard-main" style={{ paddingTop: 80, background: 'repeating-linear-gradient(135deg, #f8f9fb, #f8f9fb 32px, #f7dfa5 32px, #f7dfa5 36px)' }}>
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
