// src/pages/User/Shop.jsx
import React, { useEffect } from "react";
import useClient from "../../hooks/useClient";

const Shop = ({ userId }) => {
  const { products, loading, error, fetchProducts, addToCart } = useClient(userId);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="shop-page max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-extrabold mb-8 text-orange-600 text-center tracking-tight font-jumia">
        Shop Products
      </h2>
      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500"></div>
          <span className="ml-4 text-orange-600 text-lg font-jumia">Loading products...</span>
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold bg-red-50 rounded py-2 mb-4">
          {error}
        </div>
      )}

      <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-card bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-orange-100 transition-transform duration-300 hover:scale-105 hover:shadow-2xl group"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-32 w-32 object-cover rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 border-2 border-orange-200"
              />
            )}
            <h3 className="text-lg font-bold text-gray-800 mb-1 text-center">{product.title || product.name}</h3>
            <p className="text-sm text-gray-500 mb-2 text-center line-clamp-2">{product.description}</p>
            <p className="text-lg text-orange-600 font-bold mb-4">₦{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="p-3 bg-orange-500 rounded-full shadow hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 flex items-center justify-center"
              title="Add to Cart"
            >
              {/* Shopping cart icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.6 17h8.8a1 1 0 00.95-.68L21 13M7 13V6h13"
                />
              </svg>
            </button>
          </div>
        ))}
        {products.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;