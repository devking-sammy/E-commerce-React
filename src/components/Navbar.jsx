import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../images/Main-Logo.png"; // Import your logo image

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo only, bigger */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20"
          />
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-600">
            Home
          </Link>
          <Link to="/shop" className="text-white hover:text-blue-600">
            Shop
          </Link>
          <Link to="/about-us" className="text-white hover:text-blue-600">
            About Us
          </Link>
          <Link to="/services" className="text-white hover:text-blue-600">
            Services
          </Link>
        </div>

        {/* Auth / User / Admin Buttons */}
        <div className="space-x-4 flex items-center">
          {!user && (
            <>
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <Link
              to="/user/profile"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Profile
            </Link>
          )}

          {user && user.role === "admin" && (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 text-white rounded shadow hover:from-purple-700 hover:to-indigo-700 transition font-semibold"
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "staff" && (
            <Link
              to="/staff"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded shadow hover:from-blue-700 hover:to-green-600 transition font-semibold"
            >
              Staff Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
