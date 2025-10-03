import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../AuthContext/CartContext";
import { privateApiClient } from "../../lib/client";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Prepare items for backend order
  const items = cart.map((it) => ({
    productId: it.productId?._id || it._id,
    quantity: it.quantity,
    price: it.productId?.price ?? it.price,
    image: it.productId?.image,
    name: it.productId?.title,
  }));

  const totalAmount = useMemo(
    () => items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0),
    [items]
  );

  const handleCreateOrder = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await privateApiClient.post("/orders", {
        items,
        totalAmount,
      });

      const order = res.data.order;
      setLoading(false);

      // move to fake payment
      simulatePaymentFlow(order._id);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Failed to create order");
    }
  };

  // ✅ Simulated Payment
  const simulatePaymentFlow = (orderId) => {
    setPaying(true);
    setError(null);

    setTimeout(async () => {
      try {
        await privateApiClient.post(`/orders/${orderId}/pay-fake`, {
          txRef: `FAKE-${Date.now()}`,
        });

        clearCart(); // empty cart after payment
        setPaying(false);
        navigate("/user/orders"); // redirect to order history
      } catch (err) {
        setPaying(false);
        setError(err.response?.data?.message || err.message || "Payment failed");
      }
    }, 2500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* ✅ Order Summary */}
      <div className="mb-4">
        <h3 className="font-semibold">Order summary</h3>
        <ul className="mt-2 space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between text-sm border-b pb-2"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={item.image}
                  alt={item.title || "Product Image"}
                  className="w-10 h-10 object-cover rounded"
                />
                <span>{item.title || "Unnamed Product"}</span>
              </div>
              <span>
                {item.quantity} × ₦{(item.price || 0).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {!paying ? (
        <>
          <button
            onClick={handleCreateOrder}
            disabled={loading || items.length === 0}
            className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating order..." : "Proceed to Payment (Simulated)"}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This uses a fake payment flow for testing. No real money is charged.
          </p>
        </>
      ) : (
        <div className="p-6 bg-yellow-50 rounded text-center">
          <p className="font-semibold mb-3">Processing fake payment...</p>
          <div className="inline-block w-12 h-12 border-4 border-dashed rounded-full border-green-500 animate-spin" />
          <p className="text-sm text-gray-600 mt-3">Do not close this window</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
