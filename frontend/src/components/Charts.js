import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export function OrdersPerProductChart({ data }) {
  // Defensive: If data is not an object or is empty, render a fallback
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <div style={{color: '#888', padding: 16}}>No product order data available.</div>;
  }
  // Chart.js expects numbers, not objects/arrays as data values
  const labels = Object.keys(data);
  const values = labels.map(label => {
    const value = data[label];
    return typeof value === 'number' ? value : 0;
  });
  const chartData = {
    labels,
    datasets: [
      {
        label: "Orders per Product",
        data: values,
        backgroundColor: "#1976d2",
      },
    ],
  };
  return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
}

export function OrdersPerStatusChart({ data }) {
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
    return <div style={{color: '#888', padding: 16}}>No order status data available.</div>;
  }
  const labels = Object.keys(data);
  const values = labels.map(label => {
    const value = data[label];
    return typeof value === 'number' ? value : 0;
  });
  const chartData = {
    labels,
    datasets: [
      {
        label: "Orders per Status",
        data: values,
        backgroundColor: ["#1976d2", "#43a047", "#fbc02d", "#e53935"],
      },
    ],
  };
  return <Pie data={chartData} options={{ responsive: true }} />;
}
