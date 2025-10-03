import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components for bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const productsData = [80, 90, 100, 110, 120, 130];
const ordersData = [60, 70, 75, 80, 85, 90];
const paymentsData = [40, 50, 60, 65, 70, 75];

const chartData = {
  labels,
  datasets: [
    {
      label: "Products",
      data: productsData,
      backgroundColor: "rgba(37,99,235,0.75)",
      borderColor: "#2563eb",
      borderWidth: 2,
      borderRadius: { topLeft: 12, topRight: 12 },
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: "Orders",
      data: ordersData,
      backgroundColor: "rgba(16,185,129,0.75)",
      borderColor: "#10b981",
      borderWidth: 2,
      borderRadius: { topLeft: 12, topRight: 12 },
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: "Payments",
      data: paymentsData,
      backgroundColor: "rgba(245,158,66,0.75)",
      borderColor: "#f59e42",
      borderWidth: 2,
      borderRadius: { topLeft: 12, topRight: 12 },
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#334155",
        font: { size: 15, weight: "bold", family: "inherit" },
        boxWidth: 18,
        padding: 18,
      },
    },
    title: {
      display: true,
      text: "Staff Dashboard Statistics (Monthly Trend)",
      color: "#2563eb",
      font: { size: 24, weight: "bold", family: "inherit" },
      padding: { top: 10, bottom: 30 },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#2563eb",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#fff",
      borderWidth: 1,
      padding: 16,
      caretSize: 8,
      cornerRadius: 10,
      titleFont: { size: 16, weight: "bold" },
      bodyFont: { size: 15 },
      displayColors: true,
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#2563eb",
        font: { size: 16, weight: "bold" },
        padding: 10,
      },
      stacked: false,
    },
    y: {
      grid: {
        color: "#e0e7ff",
        borderDash: [4, 4],
      },
      beginAtZero: true,
      min: 0,
      max: Math.max(...productsData, ...ordersData, ...paymentsData) + 20,
      ticks: {
        color: "#334155",
        font: { size: 15 },
        stepSize: 20,
        padding: 8,
      },
      stacked: false,
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 10,
      bottom: 10,
    },
  },
  animation: {
    duration: 1200,
    easing: "easeOutQuart",
  },
};

const StaffDashboardHome = () => {
  const stats = {
    products: productsData[productsData.length - 1],
    orders: ordersData[ordersData.length - 1],
    payments: paymentsData[paymentsData.length - 1],
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 mb-8 border border-blue-100">
        <h1 className="text-3xl font-extrabold mb-4 text-blue-700 tracking-tight text-center">
          Staff Dashboard
        </h1>
        <p className="text-gray-700 text-lg text-center mb-6">
          Welcome, Staff! You can manage products, orders, and payments here.
        </p>
        <div className="flex justify-center mb-8 gap-8">
          <div className="bg-blue-50 rounded-xl px-6 py-4 text-center shadow">
            <div className="text-2xl font-bold text-blue-700">{stats.products}</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div className="bg-green-50 rounded-xl px-6 py-4 text-center shadow">
            <div className="text-2xl font-bold text-green-700">{stats.orders}</div>
            <div className="text-gray-600">Orders</div>
          </div>
          <div className="bg-yellow-50 rounded-xl px-6 py-4 text-center shadow">
            <div className="text-2xl font-bold text-yellow-700">{stats.payments}</div>
            <div className="text-gray-600">Payments</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-xl shadow p-8">
          <Bar data={chartData} options={chartOptions} height={320} />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardHome;
