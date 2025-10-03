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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const usersData = [900, 1000, 1100, 1200, 1245, 1300];
const ordersData = [400, 420, 470, 500, 532, 550];
const revenueData = [8000, 9000, 10000, 11000, 12340, 13000];

const chartData = {
  labels: chartLabels,
  datasets: [
    {
      label: "Users",
      data: usersData,
      backgroundColor: "rgba(99,102,241,0.8)",
      borderRadius: 10,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: "Orders",
      data: ordersData,
      backgroundColor: "rgba(16,185,129,0.8)",
      borderRadius: 10,
      barPercentage: 0.5,
      categoryPercentage: 0.5,
    },
    {
      label: "Revenue",
      data: revenueData,
      backgroundColor: "rgba(245,158,66,0.8)",
      borderRadius: 10,
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
      text: "Dashboard Statistics (Monthly Trend)",
      color: "#6366f1",
      font: { size: 22, weight: "bold", family: "inherit" },
      padding: { top: 10, bottom: 30 },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#6366f1",
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
          if (context.dataset.label === "Revenue") {
            return `${context.dataset.label}: $${context.parsed.y}`;
          }
          return `${context.dataset.label}: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#6366f1",
        font: { size: 16, weight: "bold" },
        padding: 10,
      },
    },
    y: {
      grid: {
        color: "#e0e7ff",
        borderDash: [4, 4],
      },
      beginAtZero: true,
      min: 0,
      max: Math.max(...usersData, ...ordersData, ...revenueData) + 1000,
      ticks: {
        color: "#334155",
        font: { size: 15 },
        stepSize: 1000,
        padding: 8,
      },
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

const DashboardHome = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-medium text-indigo-700">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-900">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-medium text-green-700">Total Orders</h3>
          <p className="text-2xl font-bold text-green-900">532</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-lg font-medium text-yellow-700">Revenue</h3>
          <p className="text-2xl font-bold text-yellow-900">$12,340</p>
        </div>
      </div>

      {/* Professional Bar Chart */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 rounded-xl shadow p-8">
        <Bar data={chartData} options={chartOptions} height={320} />
      </div>
    </div>
  );
};

export default DashboardHome;
