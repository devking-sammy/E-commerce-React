import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";

const Users = () => {
  const { users, loading, error, getUsers, deleteUser } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading users...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 text-center">Users</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{u.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      u.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {u.role || "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/users/${u._id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;