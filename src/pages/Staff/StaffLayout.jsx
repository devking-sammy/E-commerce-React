import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";



const navLinks = [
  { to: "/staff", label: "Dashboard", end: true },
  { to: "/staff/products", label: "Products" },
  { to: "/staff/orders", label: "Orders" },
  { to: "/staff/payments", label: "Payments" },
  { to: "/staff/settings", label: "Settings" },
];

const StaffLayout = () => {

  const { logout } = useAuth();
  return (
    <div className="staff-dashboard flex h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-lg">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
          <img
            src="https://ui-avatars.com/api/?name=Staff&background=0D8ABC&color=fff"
            alt="Staff"
            className="w-10 h-10 rounded-full border"
          />
          <span className="text-2xl font-bold tracking-tight">Staff Panel</span>
        </div>
        <nav className="flex-1 p-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition font-medium ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-gray-800 hover:text-blue-200"
                    }`
                  }
                >
                  {/* Icon placeholder */}
                  <span className="inline-block w-5 h-5 bg-blue-700 rounded-full opacity-20 mr-2"></span>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto bg-white rounded-tl-3xl shadow-inner">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;