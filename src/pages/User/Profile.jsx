import React from "react";
import { useAuth } from "../../hooks/useAuth.js";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-blue-100 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">
        User Profile
      </h2>
      {user ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-900 transition-colors duration-300">{user.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900 transition-colors duration-300">{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold transition-all duration-300">
              {user.role}
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 animate-pulse">No user data found.</p>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeInProfile 0.7s ease;
          }
          @keyframes fadeInProfile {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
