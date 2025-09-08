// src/components/layouts/authLayout.jsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome Back</h1>
        {/* Auth Pages will render here */}
        <Outlet />
      </div>
    </div>
  );
}
