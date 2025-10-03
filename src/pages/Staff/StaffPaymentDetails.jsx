import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePayments from "../../hooks/usePayment";

export default function StaffPaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payment, getPaymentById, loading, error } = usePayments();

  useEffect(() => {
    getPaymentById(id);
  }, [id, getPaymentById]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading payment...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  if (!payment)
    return (
      <div className="text-center mt-10 text-gray-500">
        No payment found.
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Payment Details</h2>
      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700">Payment ID:</span>
          <span className="ml-2 text-gray-900">{payment._id}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Order:</span>
          <span className="ml-2 text-gray-900">{payment.orderId}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Customer:</span>
          <span className="ml-2 text-gray-900">{payment.customerName}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Amount:</span>
          <span className="ml-2 text-blue-700 font-bold">₦{payment.amount}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
            payment.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}>
            {payment.status}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Date:</span>
          <span className="ml-2 text-gray-900">{new Date(payment.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Back
      </button>
    </div>
  );
}