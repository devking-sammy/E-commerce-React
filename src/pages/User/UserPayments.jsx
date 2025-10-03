// src/pages/User/Payments.jsx
import React, { useEffect } from "react";
import useClient from "../../hooks/useClient";

const UserPayments = ({ userId }) => {
  const { payments, fetchPayments, loading, error } = useClient(userId);

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="payments-page">
      <h2>My Payments</h2>
      {loading && <p>Loading payments...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {payments.length === 0 ? (
        <p>No payment history</p>
      ) : (
        <ul>
          {payments.map((payment) => (
            <li key={payment._id}>
              Payment #{payment._id} - ${payment.amount} - {payment.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserPayments;
