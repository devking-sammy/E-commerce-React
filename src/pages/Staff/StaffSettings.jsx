import React, { useState } from "react";
import useSettings from "../../hooks/useSetting";

const SettingsPage = () => {
  const {
    settings,
    loading,
    error,
    success,
    handleChange,
    updateSettings,
  } = useSettings();

  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings();
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white shadow-2xl rounded-2xl p-8">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={`https://ui-avatars.com/api/?name=${settings.firstname || "Admin"}+${settings.lastname || ""}&background=0D8ABC&color=fff&size=128`}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg mb-4"
        />
        <h2 className="text-2xl font-bold text-blue-700 mb-1">
          {settings.firstname} {settings.lastname}
        </h2>
        <p className="text-gray-600 mb-2">{settings.email}</p>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase">
          {settings.role}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Account Settings
      </h3>
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-600"></div>
          <span className="ml-3 text-blue-600 font-medium">Loading...</span>
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold mb-4">{error}</p>
      )}
      {success && (
        <p className="text-center text-green-600 font-semibold mb-4">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            name="firstname"
            value={settings.firstname}
            onChange={handleChange}
            type="text"
            className="border border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading || !editing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            name="lastname"
            value={settings.lastname}
            onChange={handleChange}
            type="text"
            className="border border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading || !editing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            name="email"
            value={settings.email}
            onChange={handleChange}
            type="email"
            className="border border-blue-200 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading || !editing}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <input
            name="role"
            value={settings.role}
            disabled
            type="text"
            className="border border-gray-200 rounded-lg px-4 py-3 w-full bg-gray-100 text-gray-500"
          />
        </div>


        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="w-full mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center shadow-lg"
          >
            Edit Settings
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-500 transition flex items-center justify-center shadow-lg ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="w-full mt-4 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition flex items-center justify-center shadow-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </form>

      
    </div>
  );
};

export default SettingsPage;