import React from "react";
import { useCart } from "../../AuthContext/CartContext";

const UserCart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // ✅ Calculate total
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  // 🛒 Checkout handler (just redirect)
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = "checkout"; // 🚀 navigate to checkout
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white/40 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <img
                src={item.productId?.image}
                alt={item.productId?.name}
                className="w-24 h-24 object-contain rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.productId?.name}
                </h2>
                <p className="text-black font-bold">
                  ₦{item.productId?.price?.toLocaleString()}
                </p>
                <p className="text-gray-600 font-bold">
                  Total: ₦{(
                    (item.productId?.price || 0) * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.productId._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-bold text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.productId._id)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.productId._id)}
                className="ml-4 px-3 py-1 rounded transition-all duration-300 
               text-red-500 hover:text-white hover:bg-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="flex justify-between items-center pt-6 border-t">
            <h2 className="text-xl font-bold text-gray-800">Total:</h2>
            <p className="text-2xl font-bold text-black">
              ₦{totalPrice.toLocaleString()}
            </p>
          </div>

          {/* Clear Cart */}
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600"
          >
            Clear Cart
          </button>

          {/* ✅ Checkout (Redirect only) */}
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCart;
