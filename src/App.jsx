// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/inputs/layouts/authLayout";
import DashLayout from "./components/inputs/layouts/dashLayout";
import Home from "./pages/Dashboard/home";
import AiChatbot from "./pages/Dashboard/aiChatbot";
import Insight from "./pages/Dashboard/insight";
import Suggestions from "./pages/Dashboard/suggestions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashLayout />}>
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
