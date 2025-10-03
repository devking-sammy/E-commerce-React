import React, { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import backgroundImage from "../../images/BackGround-Image3.png";
import { useCart } from "../../AuthContext/CartContext"; // ✅ Import cart context
import { useAuth } from "../../hooks/useAuth";

const UserLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animate, setAnimate] = useState(false); // ✅ animation state

  const { cart } = useCart(); // ✅ Access cart state
  const { logout } = useAuth();

  // Track scroll to toggle navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Trigger bounce when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500); // reset after animation
      return () => clearTimeout(timer);
    }
  }, [cart]);

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50 bg-fixed bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* 🔹 Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            to="/user"
            className={`text-3xl font-extrabold tracking-wide transition ${
              scrolled ? "text-orange-500" : "text-white drop-shadow"
            }`}
          >
            My Shop
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-8">
            <div
              className={`flex items-center rounded-md overflow-hidden transition ${
                scrolled
                  ? "border border-gray-300 bg-white"
                  : "border border-white/50 bg-white/20 backdrop-blur-sm"
              }`}
            >
              <input
                type="text"
                placeholder="Search for products, brands and categories"
                className={`flex-1 px-4 py-2 focus:outline-none text-sm ${
                  scrolled ? "text-gray-700" : "text-white placeholder-white"
                }`}
              />
              <button className="bg-orange-500 px-4 py-2 text-white font-semibold hover:bg-orange-600 transition">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right side (icons/links) */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="cart"
              className={`relative flex items-center transition font-medium ${
                scrolled ? "text-gray-700 hover:text-orange-500" : "text-white"
              }`}
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              Cart
              {/* ✅ Cart badge with bounce animation */}
              {cart.length > 0 && (
                <span
                  className={`absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full transform transition-all ${
                    animate ? "animate-bounce" : ""
                  }`}
                >
                  {cart.length}
                </span>
              )}
            </NavLink>

            {/* Account with dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center transition font-medium ${
                  scrolled
                    ? "text-gray-700 hover:text-orange-500"
                    : "text-white"
                }`}
              >
                <User className="h-5 w-5 mr-1" />
                Account
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-2 z-50">
                  <NavLink
                    to="/user/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Account
                  </NavLink>
                  <NavLink
                    to="/user/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Orders
                  </NavLink>
                  <NavLink
                    to="/user/payments"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Payments
                  </NavLink>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 🔸 Navigation Bar */}
        <nav
          className={`transition-all duration-300 ${
            scrolled ? "bg-gray-100 border-t border-gray-200" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto flex space-x-6 px-6 py-2 text-sm font-medium">
            <NavLink
              to="shop"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="payments"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`
              }
            >
              Payments
            </NavLink>
          </div>
        </nav>
      </header>

      {/* 🔹 Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-gray-900 text-gray-400 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-orange-500">My Shop</span>. All
            rights reserved.
          </p>
          <p className="mt-2">Inspired by Jumia • Built with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default UserLayout;
