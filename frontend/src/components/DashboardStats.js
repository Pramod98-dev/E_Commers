import React from "react";
import "./DashboardStats.css";

const statCards = [
  { label: "Visits", value: "914,001", color: "#e53935", icon: "\ud83d\udc65" },
  { label: "Bounce Rate", value: "46.41%", color: "#fbc02d", icon: "\ud83d\udeb6" },
  { label: "Pageviews", value: "4,054,876", color: "#43a047", icon: "\ud83d\udcc8" },
  { label: "Growth Rate", value: "46.43%", color: "#1976d2", icon: "\ud83d\udcca" },
];

export default function DashboardStats({ summary }) {
  // You can replace statCards with dynamic data from summary if available
  return (
    <div className="dashboard-stats-row">
      {statCards.map((card, i) => (
        <div className="dashboard-stat-card" style={{ background: card.color }} key={i}>
          <div className="stat-icon">{card.icon}</div>
          <div className="stat-value">{card.value}</div>
          <div className="stat-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
