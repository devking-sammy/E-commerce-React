import React, { useState } from "react";
import useLogin from "../../hooks/useLogin.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { handleLogin, loading, error } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = await handleLogin(email, password); // ✅ get user back

    if (user) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);

        // ✅ role-based redirect handled here
        if (user.role === "admin") navigate("/dashboard");
        else if (user.role === "user") navigate("/user");
        else if (user.role === "staff") navigate("/staff");
        else navigate("/unauthorized");
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* ✅ Custom Success Alert Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-6 rounded-2xl shadow-2xl text-center animate-slide-up">
            <div className="flex items-center justify-center mb-3">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Login Successful 🎉</h2>
            <p className="text-gray-600 text-sm">
              Welcome back! Redirecting you to your dashboard...
            </p>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://ui-avatars.com/api/?name=Login&background=0D8ABC&color=fff"
            alt="Login"
            className="w-16 h-16 rounded-full mb-2 shadow"
          />
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">
            Login
          </h2>
          <p className="text-gray-500 text-sm">Sign in to your dashboard</p>
        </div>

        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold bg-red-50 rounded py-2">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
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
              placeholder="Your password"
              autoComplete="current-password"
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
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Forgot password?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Reset
          </a>
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Click here to register
          </a>
        </div>
      </div>

      {/* Animation for success modal */}
      <style>
        {`
          .animate-slide-up {
            animation: slideUp 0.5s ease-out;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
