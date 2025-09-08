import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Using react-icons for a modern look

export default function DashLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg p-6 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-blue-900 whitespace-nowrap">Mindfull Matrix</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-blue-900 transition-colors duration-200 text-2xl"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav className="flex flex-col gap-6 flex-grow">
          <Link
            to="/"
            className="flex items-center gap-4 text-gray-700 hover:text-blue-900 transition-colors duration-200"
          >
            <span className="text-2xl">🏠</span>
            {isSidebarOpen && (
              <span className="font-medium whitespace-nowrap">Home</span>
            )}
          </Link>
          <Link
            to="/chatbot"
            className="flex items-center gap-4 text-gray-700 hover:text-blue-900 transition-colors duration-200"
          >
            <span className="text-2xl">🤖</span>
            {isSidebarOpen && (
              <span className="font-medium whitespace-nowrap">AI Chatbot</span>
            )}
          </Link>
          <Link
            to="/insights"
            className="flex items-center gap-4 text-gray-700 hover:text-blue-900 transition-colors duration-200"
          >
            <span className="text-2xl">📊</span>
            {isSidebarOpen && (
              <span className="font-medium whitespace-nowrap">Insights</span>
            )}
          </Link>
          <Link
            to="/suggestions"
            className="flex items-center gap-4 text-gray-700 hover:text-blue-900 transition-colors duration-200"
          >
            <span className="text-2xl">💡</span>
            {isSidebarOpen && (
              <span className="font-medium whitespace-nowrap">Suggestions</span>
            )}
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}