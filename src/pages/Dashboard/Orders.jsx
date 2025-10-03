import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrders from "../../hooks/useOrder";

export default function Orders() {
  const { orders, getOrders, updateOrder, deleteOrder, loading } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading orders...</span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">Orders</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4 text-sm text-gray-800">
                  {order._id}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-blue-700 font-bold">
                  ₦{order.total}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() =>
                      updateOrder(order._id, { status: "Completed" })
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-xs"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/orders/${order._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-xs"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
