import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import logo from "../images/Main-Logo.png";
import logo2 from "../images/Main-Logo2.png";
import { Search } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center transition-all duration-300">
          <img
            src={scrolled ? logo2 : logo}
            alt="Logo"
            className={`h-14 w-14 transition-all duration-300 ${
              scrolled ? "scale-110" : "scale-100"
            }`}
          />
        </Link>

        {/* 🔹 Middle Nav Links */}
        <div className="hidden md:flex space-x-8 font-medium">
          <Link
            to="/"
            className={`transition ${
              scrolled
                ? "text-gray-700 hover:text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          >
            Home
          </Link>
          <Link
            to="auth/register"
            className={`transition ${
              scrolled
                ? "text-gray-700 hover:text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          >
            Shop
          </Link>
          <Link
            to="/about-us"
            className={`transition ${
              scrolled
                ? "text-gray-700 hover:text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          >
            About Us
          </Link>
          <Link
            to="/services"
            className={`transition ${
              scrolled
                ? "text-gray-700 hover:text-orange-500"
                : "text-white hover:text-orange-400"
            }`}
          >
            Services
          </Link>
        </div>

        {/* 🔹 Right Side Buttons */}
        <div className="space-x-4 flex items-center">
          {!user && (
            <>
              <Link
                to="/auth/login"
                className={`px-4 py-2 rounded-md font-semibold transition ${
                  scrolled
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                }`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && user.role === "user" && (
            <Link
              to="/user/profile"
              className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Profile
            </Link>
          )}

          {user && user.role === "admin" && (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Dashboard
            </Link>
          )}

          {user && user.role === "staff" && (
            <Link
              to="/staff"
              className="px-4 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Staff Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={logout}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                scrolled
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Optional thin divider on scroll */}
      {scrolled && <div className="border-t border-gray-100" />}
    </header>
  );
}
