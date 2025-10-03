import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/use.Regiser.js";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading, error } = useRegister();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ firstname, lastname, email, password });

    if (result.success) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigate("/auth/login"); // ✅ redirect after alert
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 relative">
        {/* ✅ Success Alert */}
        {showSuccess && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
            🎉 Registration successful — redirecting to login...
          </div>
        )}

        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ui-avatars.com/api/?name=New+User&background=0D8ABC&color=fff"
            alt="User"
            className="w-16 h-16 rounded-full mb-2 shadow"
          />
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm">Register to start shopping</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold bg-red-50 rounded py-2">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Last name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Choose a password"
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className={`w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-500 transition flex items-center justify-center shadow-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
