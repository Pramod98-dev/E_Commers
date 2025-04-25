import React from "react";
import "./AdminSidebar.css";

const sidebarItems = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "products", label: "Products", icon: "📦" },
  { key: "orders", label: "Orders", icon: "🛒" },
  // Add more sections here as needed
  // Removed analytics section as requested
];

const AdminSidebar = ({ active, onSelect }) => (
  <aside className="admin-sidebar">
    <div className="sidebar-logo">Ms Mobile Admin</div>
    <nav>
      <ul>
        {sidebarItems.map(item => (
          <li
            key={item.key}
            className={active === item.key ? "active" : ""}
            onClick={() => onSelect(item.key)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
    {/* Remove any logout button from sidebar */}
  </aside>
);

export default AdminSidebar;
