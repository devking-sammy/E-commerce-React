import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useOrders from "../../hooks/useOrder";

export default function OrderDetails() {
  const { id } = useParams();
  const { order, getOrderById, loading, error } = useOrders();

  useEffect(() => {
    getOrderById(id);
  }, [id, getOrderById]);

  if (loading) return <p>Loading order...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.total}</p>

      <h3>Products</h3>
      <ul>
        {order.products?.map((p) => (
          <li key={p._id}>
            {p.title} — {p.quantity} × ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
