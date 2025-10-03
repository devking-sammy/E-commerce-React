import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUser";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserById, updateUserRole, user, loading, error } = useUsers();
  const [role, setRole] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedUser = await getUserById(id);
      if (fetchedUser) setRole(fetchedUser.role);
    })();
  }, [id, getUserById]);

  const handleRoleUpdate = async () => {
    setSaving(true);
    await updateUserRole(id, role);
    setSaving(false);
    alert("User role updated successfully!");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
        <span className="ml-4 text-blue-700 text-lg">Loading user...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        {error}
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-10 text-gray-500">
        User not found
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-2xl rounded-2xl p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-700 text-center tracking-tight">
        User Details
      </h1>
      <div className="flex flex-col items-center mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${user.email}&background=0D8ABC&color=fff`}
          alt={user.email}
          className="w-20 h-20 rounded-full border mb-4 shadow"
        />
        <p className="text-lg font-semibold text-gray-800">{user.email}</p>
        <p className="text-gray-600">
          Joined: <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-blue-200 rounded-lg px-4 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
        <button
          onClick={handleRoleUpdate}
          disabled={saving}
          className={`mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-500 transition flex items-center justify-center shadow-lg ${saving ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {saving ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Updating...
            </>
          ) : (
            "Update Role"
          )}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold w-full"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;