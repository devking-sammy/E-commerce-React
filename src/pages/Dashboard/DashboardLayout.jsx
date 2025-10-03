import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";


const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            {/* Example: User avatar and name */}
            <div className="flex items-center gap-2">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                alt="Admin"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-700">Admin</span>
            </div>
            {/* Example: Settings icon */}
            <button
              className="p-2 rounded-full hover:bg-blue-100 transition"
              title="Settings"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2M20 12a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 overflow-y-auto flex-1 bg-white rounded-t-lg shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );J
};

export default DashboardLayout;
