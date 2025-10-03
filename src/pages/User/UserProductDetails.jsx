import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useUserProductDetails from "../../hooks/useUserProductDetails";
import { useCart } from "../../AuthContext/CartContext";

const UserProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useUserProductDetails(id);
  const { addToCart } = useCart();

  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);

    // Hide after 2 seconds
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-orange-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md my-8 relative">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-lg max-h-96 object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <p className="text-lg text-orange-500 font-semibold mb-4 font-bold">
            ₦{product.price}
          </p>
          <p className="text-black font-bold mb-6">{product.description}</p>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>

          <Link
            to="/user"
            className="ml-4 text-orange-500 font-bold hover:underline"
          >
            Back to Products
          </Link>
        </div>
      </div>

      {/* ✅ Notification */}
      {showNotification && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          ✅ {product.name} added to cart
        </div>
      )}
    </div>
  );
};

export default UserProductDetails;
