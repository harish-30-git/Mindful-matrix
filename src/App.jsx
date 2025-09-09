import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";

import DashLayout from "./components/inputs/layouts/dashLayout";
import Home from "./pages/Dashboard/home";
import AiChatbot from "./pages/Dashboard/aiChatbot";
import Insight from "./pages/Dashboard/insight";
import Suggestions from "./pages/Dashboard/suggestions";

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // set this in login
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="chatbot" element={<AiChatbot />} />
          <Route path="insights" element={<Insight />} />
          <Route path="suggestions" element={<Suggestions />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
