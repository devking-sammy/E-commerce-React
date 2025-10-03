import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePayments from "../../hooks/usePayment";

export default function Payments() {
  const { payments, getPayments, updatePayment, deletePayment, loading } = usePayments();
  const navigate = useNavigate();

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading payments...</span>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-blue-700">Payments</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-blue-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">{p._id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{p.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{p.customerName}</td>
                <td className="px-6 py-4 text-sm text-blue-700 font-bold">₦{p.amount}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      p.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => updatePayment(p._id, { status: "Completed" })}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-xs"
                  >
                    Mark Completed
                  </button>
                  <button
                    onClick={() => deletePayment(p._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/payments/${p._id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-xs"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}