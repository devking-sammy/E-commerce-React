import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center bg-gray-100 text-center p-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store 🛒
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Discover amazing products at unbeatable prices.
        </p>
        <div className="flex gap-4">
          <Link
            to="/user/shop"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </Link>
          <Link
            to="/auth/register"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🔥 Hot Deals</h3>
            <p className="text-gray-600">Find discounts you won’t believe.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🚚 Fast Delivery</h3>
            <p className="text-gray-600">Get your items in record time.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">💳 Secure Payment</h3>
            <p className="text-gray-600">Shop confidently with secure checkout.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; {new Date().getFullYear()} My Ecommerce. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
