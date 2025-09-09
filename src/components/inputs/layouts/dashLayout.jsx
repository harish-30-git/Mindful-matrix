import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function DashLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-tr from-sky-200 via-sky-50 to-violet-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-2xl p-6 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } rounded-r-3xl h-full`}
      >
        {/* Header */}
        <div
          className={`flex items-center mb-6 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {isSidebarOpen && (
            <h2 className="text-xl font-extrabold text-blue-900 drop-shadow-sm whitespace-nowrap">
              Mindfull Matrix
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-blue-900 transition-colors duration-200 text-2xl p-2 rounded-full hover:bg-gray-100"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 flex-grow mt-3">
          {[
            { path: "", label: "Home", icon: "🏠" },
            { path: "chatbot", label: "AI Chatbot", icon: "🤖" },
            { path: "insights", label: "Insights", icon: "📊" },
            { path: "suggestions", label: "Suggestions", icon: "💡" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-300
                text-gray-700 hover:text-white hover:bg-gradient-to-r from-blue-600 to-purple-600
                shadow-md hover:shadow-xl text-lg w-full
                ${isSidebarOpen ? "justify-start" : "justify-center"}
              `}
            >
              <span className="text-2xl flex items-center justify-center w-8">
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="pt-4 mt-auto">
          <div
            className={`flex items-center gap-3 px-2 mb-4 ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <FaUserCircle className="text-3xl text-blue-600" />
            {isSidebarOpen && (
              <div>
                <p className="font-semibold text-gray-800">
                  {username || "User"}
                </p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
            )}
          </div>
          {isSidebarOpen && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-2 py-3 rounded-2xl text-red-600 hover:bg-red-100 w-full transition-colors duration-200"
            >
              <FaSignOutAlt className="text-2xl" />
              <span className="font-semibold">Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 transition-all duration-300 p-6 h-full overflow-hidden">
        <div className="max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
