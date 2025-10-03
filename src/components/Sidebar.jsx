import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo / Title */}
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        Admin Dashboard
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard/products"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/orders"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/payments"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Payments
        </NavLink>
        <NavLink
          to="/dashboard/users"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            `block px-2 py-1 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700" : ""
            }`
          }
        >
          Settings
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
