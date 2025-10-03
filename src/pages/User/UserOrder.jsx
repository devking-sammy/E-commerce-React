// src/pages/User/Orders.jsx
import React, { useEffect } from "react";
import useUserOrders from "../../hooks/useUserOrder";

const UserOrders = () => {
  const { orders, fetchOrders, loading, error } = useUserOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 my-10 bg-white/40 backdrop-blur rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>

      {/* Loading State */}
      {loading && (
        <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
      )}

      {/* Error State */}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      {/* Empty Orders */}
      {orders.length === 0 && !loading ? (
        <p className="text-gray-600 text-lg">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "completed"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center gap-3">
                      {/* Product Image */}
                      {item.productId?.image && (
                        <img
                          src={item.productId.image}
                          alt={item.productId?.title || "Product Image"}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}

                      {/* Product Name */}
                      <span className="text-gray-700 font-medium">
                        {item.productId?.title || "Unnamed Product"}   
                      </span>
                    </div>

                    <span className="text-gray-600">
                      x{item.quantity} — ₦
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 flex justify-between font-bold text-lg text-gray-800">
                <span>Total:</span>
                <span>₦{order.totalAmount.toLocaleString()}</span>
              </div>

              {/* Order Date */}
              <p className="mt-2 text-sm text-gray-500">
                Placed on:{" "}
                {new Date(order.createdAt).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
